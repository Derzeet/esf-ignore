package com.example.backend.modelsDossier;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "esf_new")
public class EsfNew {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "INVOICE_ID")
    private Long invoiceId;

    @Column(name = "PRODUCT_NUMBER")
    private Long productNumber;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "UNIT_CODE")
    private String unitCode;

    @Column(name = "UNIT_NOMENCLATURE")
    private String unitNomenclature;

    @Column(name = "QUANTITY")
    private Double quantity;

    @Column(name = "UNIT_PRICE")
    private Double unitPrice;

    @Column(name = "EXCISE_RATE")
    private Double exciseRate;

    @Column(name = "EXCISE_AMOUNT")
    private Double exciseAmount;

    @Column(name = "TURNOVER_SIZE")
    private Double turnoverSize;

    @Column(name = "NDS_RATE")
    private Double ndsRate;

    @Column(name = "NDS_AMOUNT")
    private Double ndsAmount;

    @Column(name = "APPNUM_UNION")
    private String appnumUnion;

    @Column(name = "TRUORIGINCODE")
    private String truoriginCode;

    @Column(name = "IIN_SELLER")
    private String iinSeller;

    @Column(name = "IIN_SELLER_ROOT")
    private String iinSellerRoot;

    @Column(name = "NAMES_SELLER")
    private String namesSeller;

    @Column(name = "STATUS_SELLER")
    private String statusSeller;

    @Column(name = "SHARE_PARTICIPATION_SELLER")
    private Double shareParticipationSeller;

    @Column(name = "IIN_CUSTOMER")
    private String iinCustomer;

    @Column(name = "IIN_CUSTOMER_ROOT")
    private String iinCustomerRoot;

    @Column(name = "NAME_CUSTOMER")
    private String nameCustomer;

    @Column(name = "STATUS_CUSTOMER")
    private String statusCustomer;

    @Column(name = "SHARE_PARTICIPATION_CUSTOMER")
    private Double shareParticipationCustomer;

    @Column(name = "REGISTRATION_NUMBER")
    private String registrationNumber;

    @Column(name = "INVOICE_TYPE")
    private String invoiceType;

    @Column(name = "INVOICE_NUMBER")
    private String invoiceNumber;

    @Column(name = "INVOICE_DATE")
    private Date invoiceDate;

    @Column(name = "TURNOVER_DATE")
    private Date turnoverDate;

    @Column(name = "TOTALTURNOVERSIZE")
    private Double totalTurnoverSize;

    @Column(name = "TOTALNDSAMOUNT")
    private Double totalNdsAmount;

    @Column(name = "KOGD")
    private String kogd;

    @Column(name = "YEAR")
    private Integer year;

    @Column(name = "Quartile")
    private Double quartile;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Long invoiceId) {
        this.invoiceId = invoiceId;
    }

    public Long getProductNumber() {
        return productNumber;
    }

    public void setProductNumber(Long productNumber) {
        this.productNumber = productNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUnitCode() {
        return unitCode;
    }

    public void setUnitCode(String unitCode) {
        this.unitCode = unitCode;
    }

    public String getUnitNomenclature() {
        return unitNomenclature;
    }

    public void setUnitNomenclature(String unitNomenclature) {
        this.unitNomenclature = unitNomenclature;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Double getExciseRate() {
        return exciseRate;
    }

    public void setExciseRate(Double exciseRate) {
        this.exciseRate = exciseRate;
    }

    public Double getExciseAmount() {
        return exciseAmount;
    }

    public void setExciseAmount(Double exciseAmount) {
        this.exciseAmount = exciseAmount;
    }

    public Double getTurnoverSize() {
        return turnoverSize;
    }

    public void setTurnoverSize(Double turnoverSize) {
        this.turnoverSize = turnoverSize;
    }

    public Double getNdsRate() {
        return ndsRate;
    }

    public void setNdsRate(Double ndsRate) {
        this.ndsRate = ndsRate;
    }

    public Double getNdsAmount() {
        return ndsAmount;
    }

    public void setNdsAmount(Double ndsAmount) {
        this.ndsAmount = ndsAmount;
    }

    public String getAppnumUnion() {
        return appnumUnion;
    }

    public void setAppnumUnion(String appnumUnion) {
        this.appnumUnion = appnumUnion;
    }

    public String getTruoriginCode() {
        return truoriginCode;
    }

    public void setTruoriginCode(String truoriginCode) {
        this.truoriginCode = truoriginCode;
    }

    public String getIinSeller() {
        return iinSeller;
    }

    public void setIinSeller(String iinSeller) {
        this.iinSeller = iinSeller;
    }

    public String getIinSellerRoot() {
        return iinSellerRoot;
    }

    public void setIinSellerRoot(String iinSellerRoot) {
        this.iinSellerRoot = iinSellerRoot;
    }

    public String getNamesSeller() {
        return namesSeller;
    }

    public void setNamesSeller(String namesSeller) {
        this.namesSeller = namesSeller;
    }

    public String getStatusSeller() {
        return statusSeller;
    }

    public void setStatusSeller(String statusSeller) {
        this.statusSeller = statusSeller;
    }

    public Double getShareParticipationSeller() {
        return shareParticipationSeller;
    }

    public void setShareParticipationSeller(Double shareParticipationSeller) {
        this.shareParticipationSeller = shareParticipationSeller;
    }

    public String getIinCustomer() {
        return iinCustomer;
    }

    public void setIinCustomer(String iinCustomer) {
        this.iinCustomer = iinCustomer;
    }

    public String getIinCustomerRoot() {
        return iinCustomerRoot;
    }

    public void setIinCustomerRoot(String iinCustomerRoot) {
        this.iinCustomerRoot = iinCustomerRoot;
    }

    public String getNameCustomer() {
        return nameCustomer;
    }

    public void setNameCustomer(String nameCustomer) {
        this.nameCustomer = nameCustomer;
    }

    public String getStatusCustomer() {
        return statusCustomer;
    }

    public void setStatusCustomer(String statusCustomer) {
        this.statusCustomer = statusCustomer;
    }

    public Double getShareParticipationCustomer() {
        return shareParticipationCustomer;
    }

    public void setShareParticipationCustomer(Double shareParticipationCustomer) {
        this.shareParticipationCustomer = shareParticipationCustomer;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getInvoiceType() {
        return invoiceType;
    }

    public void setInvoiceType(String invoiceType) {
        this.invoiceType = invoiceType;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public Date getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(Date invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public Date getTurnoverDate() {
        return turnoverDate;
    }

    public void setTurnoverDate(Date turnoverDate) {
        this.turnoverDate = turnoverDate;
    }

    public Double getTotalTurnoverSize() {
        return totalTurnoverSize;
    }

    public void setTotalTurnoverSize(Double totalTurnoverSize) {
        this.totalTurnoverSize = totalTurnoverSize;
    }

    public Double getTotalNdsAmount() {
        return totalNdsAmount;
    }

    public void setTotalNdsAmount(Double totalNdsAmount) {
        this.totalNdsAmount = totalNdsAmount;
    }

    public String getKogd() {
        return kogd;
    }

    public void setKogd(String kogd) {
        this.kogd = kogd;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Double getQuartile() {
        return quartile;
    }

    public void setQuartile(Double quartile) {
        this.quartile = quartile;
    }
}
