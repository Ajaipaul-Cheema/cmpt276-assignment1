let rowNum = 5;

function addActivity() {
    var table = document.getElementById("gradeTable");
    var row = table.insertRow(rowNum);

    var cell1 = row.insertCell(0);
    cell1.innerHTML = "Activity " + rowNum;
    var cell2 = row.insertCell(1);
    cell2.innerHTML = "A" + rowNum;
    
    var cell3 = row.insertCell(2);
    cell3.innerHTML += '<td><input id="a' + rowNum + 'weight" type="number"></td>';
    var cell4 = row.insertCell(3);
    cell4.innerHTML += '<td><input id="a' + rowNum + 'gottenScore" type="number" onkeydown="calculate()" onkeyup="calculate()"> / <input id="a' +
                        rowNum + 'totalScore" type="number" onkeydown="calculate()" onkeyup="calculate()"></td>';
    row.insertCell(4).id = id="percentage" + rowNum;
    rowNum++;
}

function calculate() { 
    let activityCounter = 1;
    while (activityCounter < rowNum) {
        let gottenScore = document.getElementById("a" + activityCounter + "gottenScore").value;
        let totalScore = document.getElementById("a" + activityCounter + "totalScore").value;
        if (gottenScore != null && gottenScore != "", totalScore != null && totalScore != "") {
            let percentage = (gottenScore/totalScore) * 100;
            let rounded = Math.round(percentage * 10) / 10;
            document.getElementById("percentage" + activityCounter).innerHTML = rounded + "%";
        } else {
            document.getElementById("percentage" + activityCounter).innerHTML = "";
        }
        activityCounter++;
    }
}

function weighted() {
    let table = document.getElementById('gradeTableBody');

    let percentage = 0;
    let gottenWeight = 0;

    for (let i = 1; i < table.rows.length + 1; i++) {
        let weight = document.getElementById('a' + i + 'weight').value;
        let gottenScore = document.getElementById('a' + i + 'gottenScore').value;
        let totalScore = document.getElementById('a' + i + 'totalScore').value;

        if(validGottenScore(gottenScore) == true) {
            if(validTotalScore(totalScore) == true) {
                if(parseInt(totalScore) >= parseInt(gottenScore)) {
                    if(validWeight(weight) == true) {
                        gottenWeight += parseInt(weight);
                        percentage += (parseInt(gottenScore) / parseInt(totalScore)) * weight;
                    } else {
                        alert("Weights must be 0 or higher and non-empty.");
                        break;
                    }
                } 
            } else {
                alert("The 2nd score must be non-empty and 1 or higher.");
                break;
            }
        } else {
            alert("The 1st score must be non-empty and 0 or higher.");
            break;
        }
    }

    let amount = (percentage / gottenWeight) * 100;
    if (amount >= 0) {
        console.log(percentage)
        console.log(amount)
        console.log(gottenWeight)
        let rounded = Math.round(amount * 10) / 10;
        document.getElementById("result").innerHTML = rounded + "%";
    }

}

function mean() {
    let table = document.getElementById('gradeTableBody');

    let totalValidRows = 0;
    let totalFractions = 0;

    for (let i = 1; i < table.rows.length + 1; i++) {
        let gottenScore = document.getElementById('a' + i + 'gottenScore').value;
        let totalScore = document.getElementById('a' + i + 'totalScore').value;

        if(validGottenScore(gottenScore) == true) {
            if(validTotalScore(totalScore) == true) {
                if(parseInt(totalScore) >= parseInt(gottenScore)) {
                    totalFractions += parseInt(gottenScore) / parseInt(totalScore);
                    totalValidRows++;
                } 
            } else {
                alert("The 2nd score must be non-empty and 1 or higher.");
                break;
            }
        } else {
            alert("The 1st score must be non-empty and 0 or higher.");
            break;
        }
    }
    
    let amount = (totalFractions / totalValidRows) * 100;
    if (amount >= 0) {
        let rounded = Math.round(amount * 10) / 10;
        document.getElementById("result").innerHTML = rounded + "%";
    }

}

function validGottenScore(x) {
    if(parseInt(x).length == 0 || parseInt(x) < 0) {
        return false;
    } else {
        return true;
    }
}

function validTotalScore(x) {
    if(parseInt(x).length == 0 || parseInt(x) < 1) {
        return false;
    } else {
        return true;
    }
}

function validWeight(x) {
    if(x == "" || parseInt(x) < 0) {
        return false;
    } else {
        return true;
    }
}