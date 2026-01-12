// -----------------------------
// Group hours & salary by period
// periodType: "week", "month", "year"
// -----------------------------
function getGroupedData(empId, periodType = "month") {
    const employee = employees.find(e => e.empId === empId);
    if (!employee) return null;

    const data = {}; // { periodKey: { hours: x, salary: y } }

    employee.attendance.forEach(record => {
        if (!record.checkOut) return;

        const d = new Date(record.date);
        let key;

        // Determine the period key
        if (periodType === "week") {
            const weekNum = Math.ceil(
                ((d - new Date(d.getFullYear(), 0, 1)) / 86400000 + new Date(d.getFullYear(), 0, 1).getDay() + 1) / 7
            );
            key = `${d.getFullYear()}-W${weekNum}`;
        } else if (periodType === "month") {
            key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        } else { // year
            key = `${d.getFullYear()}`;
        }

        // Initialize if not exists
        if (!data[key]) data[key] = { hours: 0, salary: 0 };

        // Add hours and daily salary
        data[key].hours += record.hours;
        data[key].salary += record.salary;
    });

    // Add monthly bonuses (>24 days / full month)
    if (periodType === "month") {
        for (const key in data) {
            const [year, month] = key.split("-").map(Number);
            const periodRecords = employee.attendance.filter(r => {
                const pd = new Date(r.date);
                return pd.getFullYear() === year && pd.getMonth() + 1 === month && r.checkOut;
            });

            const totalDaysInMonth = new Date(year, month, 0).getDate();

            if (periodRecords.length > 24) data[key].salary += 1000;
            if (periodRecords.length === totalDaysInMonth) data[key].salary += 2000;
        }
    }

    return data;
}

// -----------------------------
// Display grouped hours & salary
// -----------------------------
function showGroupedHours() {
    const empId = document.querySelector(".EmpID").value;
    const periodType = document.getElementById("periodType").value;

    const data = getGroupedData(empId, periodType);

    if (!data) {
        document.getElementById("groupedHours").innerHTML = "No data available";
        return;
    }

    let html = `<table border="1" style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <th>Period</th>
                        <th>Hours Worked</th>
                        <th>Salary</th>
                    </tr>`;

    for (const key in data) {
        html += `<tr>
                    <td>${key}</td>
                    <td>${data[key].hours.toFixed(2)}</td>
                    <td>₹${data[key].salary.toFixed(2)}</td>
                 </tr>`;
    }

    html += "</table>";
    document.getElementById("groupedHours").innerHTML = html;
}
