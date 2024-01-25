package com.example.backend.controller;


//import com.lowagie.text.DocumentException;
import com.example.backend.modelsDossier.Logs;
import com.example.backend.repositoryDossier.LogsRepository;
//import com.example.backend.security.jwt.JwtTokenUtil;
//import com.example.backend.security.services.UserDetailsServiceImpl;
import com.example.backend.service.esfService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class BaseController {
    @Autowired
    esfService esf_Service;

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    LogsRepository logsRepository;



    @GetMapping(value = "/download")
    public void getExcel(@RequestParam String filter, @RequestParam String search, @RequestParam String startDate,
                         @RequestParam String endDate, @RequestParam String[] groupField, HttpServletResponse response) throws IOException {
        List<Map<String, Object>> data = esf_Service.executeQueryWithOptions(filter, search, startDate, endDate, groupField);
        esf_Service.exportToExcel(data, response);
    }
    @GetMapping(value = "/downloadFull")
    public void getWithAllfields(@RequestParam String filter, @RequestParam String search, @RequestParam String startDate,
                                 @RequestParam String endDate, @RequestParam String[] groupField, HttpServletResponse response) throws IOException {
        List<Map<String, Object>> data = esf_Service.getAllFields(filter, search, startDate, endDate, groupField);
        esf_Service.exportToExcel(data, response);
    }
    @GetMapping("/logs")
    public ResponseEntity<Map<String, Object>> getLogs(@RequestParam(required = false) String startDate,
                                                       @RequestParam(required = false) String endDate,
                                                       @RequestParam(required = false) String userLogin) {
        // Check if both startDate and endDate are provided
        boolean isDateRangeProvided = startDate != null && endDate != null;

        // Build the base query
        StringBuilder queryBuilder = new StringBuilder("SELECT * FROM pfr.logs");

        // Build the WHERE clause based on the provided parameters
        if (userLogin != null) {
            queryBuilder.append(" WHERE userLogin = '").append(userLogin).append("'");
            if (isDateRangeProvided) {
                queryBuilder.append(" AND executionTime >= '").append(startDate).append("'")
                        .append(" AND executionTime <= '").append(endDate).append("'");
            }
        } else if (isDateRangeProvided) {
            queryBuilder.append(" WHERE executionTime >= '").append(startDate).append("'")
                    .append(" AND executionTime <= '").append(endDate).append("'");
        }

        String query = queryBuilder.toString();

        // Execute the query and return the results
        List<Map<String, Object>> logs = jdbcTemplate.queryForList(query);

        // Create a response object containing the logs
        Map<String, Object> response = new HashMap<>();
        response.put("logs", logs);

        return ResponseEntity.ok(response);
    }

    private Map<String, Object> createPaginationInfo(int currentPage, int pageSize, int totalCount, int totalPages) {
        Map<String, Object> paginationInfo = new HashMap<>();
        paginationInfo.put("currentPage", currentPage);
        paginationInfo.put("pageSize", pageSize);
        paginationInfo.put("totalCount", totalCount);
        paginationInfo.put("totalPages", totalPages);
        return paginationInfo;
    }


    @GetMapping("/esf")
    public List<Map<String, Object>> getTest(@RequestParam String filter,
                                             @RequestParam String search,
                                             @RequestParam String startDate,
                                             @RequestParam String endDate,
                                             @RequestParam String[] groupField,
                                             @RequestParam String testReason,
                                             @RequestParam String dopInfo) {
        String requestParams = "Запрос: " + filter + ", поиск: " + search + ", дата с: " + startDate + ", дата до: " + endDate;
//        String jwtToken = token.substring(7);
//
//         Get the username from the token
//        String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
//
//        // Load the user details using the username
//        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//
//         Insert the values into the ClickHouse table
//        LocalDateTime now = LocalDateTime.now();
//
// Format the LocalDateTime to match ClickHouse's expected format
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//        String formattedDateTime = now.format(formatter);
//
//        String insertQuery = "INSERT INTO logsEsf (requestParams, approvalBody, executionTime, userLogin) VALUES (?, ?, ?, ?)";
//        String approvalBody = "Основания проверки: " + testReason + ", " + dopInfo;
//        jdbcTemplate.update(insertQuery, requestParams, approvalBody, formattedDateTime);
        System.out.println(requestParams);
        return esf_Service.executeQueryWithOptions(filter, search, startDate, endDate, groupField);
    }
}
