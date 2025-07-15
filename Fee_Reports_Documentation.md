# Fee Reports System Documentation

## Overview
The Fee Reports system provides comprehensive reporting capabilities for fee management in your ERP system. It supports multiple report types and filtering options for detailed fee analysis.

## Features

### 📊 **Report Types**
1. **Individual Student Reports** - Detailed fee information for a specific student
2. **Class-wise Reports** - Consolidated fee data for entire classes or sections

### 📅 **Filter Options**
1. **Yearly Reports** - View fees for an entire academic year
2. **Monthly Reports** - Focus on specific months within a year
3. **Date Range Reports** - Custom date ranges for detailed analysis

### 📈 **Export Options**
- **Excel Download** - Export detailed data in Excel format
- **PDF Reports** - Professional PDF reports with summaries and charts

## How to Access
Navigate to: `/fee-reports` in your application

## Usage Guide

### 1. **Configure Report Settings**
   - Select **Report Type**: Individual Student or Class-wise
   - Choose **Filter Type**: Yearly, Monthly, or Date Range
   - Pick appropriate time periods

### 2. **Student Reports**
   - Select a specific student from the dropdown
   - Choose your preferred time filter
   - Click "Generate Report"

### 3. **Class Reports**
   - Select a class from the dropdown
   - Optionally select a specific section
   - Choose your time filter
   - Click "Generate Report"

### 4. **View Results**
   - **Summary Cards**: Quick overview of totals
   - **Detailed Table**: Complete transaction records
   - **Export Options**: Download Excel or PDF

## Summary Information Displayed

### 📋 **Summary Cards**
- **Total Students**: Number of students in the report
- **Total Amount**: Total fee amount for the period
- **Amount Paid**: Total payments received
- **Amount Due**: Outstanding balances

### 📋 **Detailed Records**
- Student ID and Name
- Class and Section
- Fee Category and Subcategory
- Fee amounts and payment status
- Payment dates and methods
- Current balance status

## Backend Integration

### 🔗 **API Endpoints** (Optional)
If your backend supports these endpoints, the system will use them:
- `GET /api/fee-reports/student` - Student-specific reports
- `GET /api/fee-reports/class` - Class-wise reports
- `GET /api/students` - Student list
- `GET /api/classes` - Class list
- `GET /api/sections/:classId` - Section list

### 🔄 **Fallback Mode**
If backend endpoints are not available, the system automatically uses mock data for demonstration purposes.

## File Structure

```
src/
├── component/
│   └── FeeReports.jsx          # Main reports component
├── services/
│   └── feeReportService.js     # Report data service
└── utils/
    └── invoiceGenerator.js     # PDF generation utility
```

## Components

### **FeeReports.jsx**
Main component handling:
- Report configuration UI
- Data filtering and display
- Export functionality

### **FeeReportService.js**
Service class handling:
- API communication
- Mock data fallback
- Data transformation

### **Invoice Generator**
Enhanced to support:
- Fee report PDFs
- Professional formatting
- Summary and detail views

## Sample Workflow

1. **Access Reports**: Navigate to `/fee-reports`
2. **Choose Type**: Select "Individual Student" or "Class-wise"
3. **Select Filters**: Pick yearly, monthly, or date range
4. **Configure Options**: Choose student/class and time period
5. **Generate Report**: Click the "Generate Report" button
6. **Review Data**: Check summary cards and detailed table
7. **Export**: Download Excel or PDF as needed

## Benefits

- **Comprehensive Analysis**: Multiple report types and filters
- **Professional Output**: High-quality PDF and Excel exports
- **Flexible Filtering**: Year, month, or custom date ranges
- **Real-time Data**: Up-to-date fee information and payment status
- **User-friendly Interface**: Intuitive configuration and navigation

## Notes

- Reports include payment history, outstanding balances, and collection percentages
- PDF reports are professionally formatted with school branding
- Excel exports include all detailed transaction data
- System works with or without backend API support
- Mock data provides realistic examples for testing and demonstration

Navigate to `/fee-reports` in your application to start using this powerful reporting feature!
