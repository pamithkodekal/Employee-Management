function exportToExcel() {
    if (!employees || employees.length === 0) {
        alert("No data available to export");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";

    // Header row
    csvContent += "Employee ID,Employee Name,Date,Check In,Check Out,Hours Worked,Daily Salary\n";

    // Data rows
    employees.forEach(emp => {
        emp.attendance.forEach(record => {
            const row = [
                emp.empId,
                emp.name,
                record.date,
                record.checkIn,
                record.checkOut || "",
                record.hours ? record.hours.toFixed(2) : "",
                record.salary ? record.salary.toFixed(2) : ""
            ];
            csvContent += row.join(",") + "\n";
        });
    });

    // Encode and create link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);

    const date = new Date();
    const filename = `employee_data_${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}.csv`;
    link.setAttribute("download", filename);

    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
}
