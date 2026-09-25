function calculateAttendance() {

    let present = Number(document.getElementById("present").value);
    let total = Number(document.getElementById("total").value);
    let target = Number(document.getElementById("target").value);

    let percentage = document.getElementById("percentage");
    let status = document.getElementById("status");
    let advice = document.getElementById("advice");

    // Check input
    if (
        present < 0 ||
        total <= 0 ||
        present > total ||
        target <= 0 ||
        target >= 100
    ) {
        percentage.innerHTML = "--%";
        status.innerHTML = "⚠️ Invalid Input";
        advice.innerHTML = "Please enter valid attendance details.";
        return;
    }

    // Calculate attendance
    let attendance = (present / total) * 100;

    percentage.innerHTML = attendance.toFixed(2) + "%";

    // Check attendance status
    if (attendance >= target) {

        status.innerHTML = "🟢 Safe";

        let canMiss = Math.floor(
            present / (target / 100) - total
        );

        advice.innerHTML =
            "You can miss <strong>" +
            canMiss +
            "</strong> more class(es) and maintain " +
            target +
            "% attendance.";

    } else {

        status.innerHTML = "🔴 Below Target";

        let needed = Math.ceil(
            ((target / 100) * total - present) /
            (1 - target / 100)
        );

        advice.innerHTML =
            "You need to attend <strong>" +
            needed +
            "</strong> consecutive class(es) to reach " +
            target +
            "% attendance.";
    }
}
function planAttendance() {

    let present = Number(document.getElementById("present").value);
    let total = Number(document.getElementById("total").value);
    let target = Number(document.getElementById("target").value);
    let futureClasses = Number(document.getElementById("futureClasses").value);

    let planText = document.getElementById("planText");

    if (
        present < 0 ||
        total <= 0 ||
        present > total ||
        target <= 0 ||
        target >= 100 ||
        futureClasses <= 0
    ) {
        planText.innerHTML = "⚠️ Please enter valid values.";
        return;
    }

    let targetDecimal = target / 100;

    // Maximum classes that can be missed
    let maxMiss = Math.floor(
        present + futureClasses -
        targetDecimal * (total + futureClasses)
    );

    if (maxMiss < 0) {
        maxMiss = 0;
    }

    if (maxMiss > futureClasses) {
        maxMiss = futureClasses;
    }

    let attendNeeded = futureClasses - maxMiss;

    planText.innerHTML =
        "📚 You should attend at least <strong>" +
        attendNeeded +
        "</strong> out of the next <strong>" +
        futureClasses +
        "</strong> classes.<br><br>" +
        "You can miss up to <strong>" +
        maxMiss +
        "</strong> class(es) and still maintain " +
        target +
        "% attendance.";
}
function addSubject() {

    let subjectName = document.getElementById("subjectName").value;
    let present = Number(document.getElementById("subjectPresent").value);
    let total = Number(document.getElementById("subjectTotal").value);

    let subjectList = document.getElementById("subjectList");

    if (subjectName === "" || total <= 0 || present < 0 || present > total) {
        subjectList.innerHTML =
            "⚠️ Please enter valid subject details.";
        return;
    }

    let attendance = (present / total) * 100;

    let status;

    if (attendance >= 75) {
        status = "🟢 Safe";
    } else {
        status = "🔴 Below 75%";
    }

    subjectList.innerHTML += `
        <div class="subject-card">
            <h3>${subjectName}</h3>
            <p>Attendance: <strong>${attendance.toFixed(2)}%</strong></p>
            <p>${status}</p>
        </div>
    `;

    document.getElementById("subjectName").value = "";
    document.getElementById("subjectPresent").value = "";
    document.getElementById("subjectTotal").value = "";
}
.subject-card {
    margin-top: 15px;
    padding: 18px;
    background: white;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
}

.subject-card h3 {
    margin-bottom: 8px;
    color: #2563eb;
}

.subject-card p {
    margin: 5px 0;
}