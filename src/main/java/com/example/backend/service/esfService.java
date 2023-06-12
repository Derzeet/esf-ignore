package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.io.OutputStream;
import java.util.*;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.http.HttpServletResponse;


@Service
public class esfService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public esfService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    public void exportToExcel(List<Map<String, Object>> data, HttpServletResponse response) throws IOException {
        // Create a new workbook
        Workbook workbook = new XSSFWorkbook();

        // Create a new sheet
        Sheet sheet = workbook.createSheet("Data");

        // Create header row
        Row headerRow = sheet.createRow(0);
        int columnCount = data.get(0).size();
        int columnIndex = 0;
        for (String fieldName : data.get(0).keySet()) {
            Cell cell = headerRow.createCell(columnIndex++);
            cell.setCellValue(fieldName);
        }

        // Create data rows
        int rowIndex = 1;
        for (Map<String, Object> row : data) {
            Row dataRow = sheet.createRow(rowIndex++);
            columnIndex = 0;
            for (Object value : row.values()) {
                Cell cell = dataRow.createCell(columnIndex++);
                if (value instanceof String) {
                    cell.setCellValue((String) value);
                } else if (value instanceof Number) {
                    cell.setCellValue(((Number) value).doubleValue());
                } else if (value instanceof Date) {
                    cell.setCellValue((Date) value);
                }
            }
        }

        // Set content type and headers for the response
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=data.xlsx");

        // Write the workbook data to the response
        OutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
    }

    public List<Map<String, Object>> executeQueryWithOptions(String filter, String search, String startDate, String endDate, String[] groupField) {
        String query = "SELECT ";
        for (String field : groupField) {
            query = query + field + ", ";
        }
        String[] iins = search.split(",");
        query = query + "sum(TURNOVER_SIZE) as Total, sum(QUANTITY) as QUANTITY FROM esf.esf_new ";
        if (filter == "seller") {
            query = query + "WHERE IIN_SELLER IN (";
            int l = iins.length;
            for (int i = 0; i < l; i++) {
                if (i != l-1) {
                    query = query + "\'" + iins[i] + "\',";
                } else {
                    query = query + "\'" + iins[i] + "\') ";
                }
            }
        } else {
            query = query + "WHERE IIN_CUSTOMER IN (";
            int l = iins.length;
            for (int i = 0; i < l; i++) {
                if (i != l-1) {
                    query = query + "\'" + iins[i] + "\',";
                } else {
                    query = query + "\'" + iins[i] + "\') ";
                }
            }
        }
        query = query +" AND toDate(TURNOVER_DATE) >= toDate(\'" + startDate + "\') " +
        "AND toDate(TURNOVER_DATE) <= toDate(\'" + endDate + "\') GROUP BY ";
        for (String field : groupField) {
            query = query + field + ", ";
        }
        query = query + "NAMES_SELLER, NAME_CUSTOMER LIMIT 1000000";
        List<Map<String, Object>> result = new ArrayList<>();
        try {
            return jdbcTemplate.queryForList(query);
        } catch (Exception e) {
            return result;
        }
    }
}
