function showError(message) {//taga ala ti error message iti HTML
    const msg = document.getElementById("message");
    if (msg) {
        msg.innerText = message;
    }
}
async function submitData() {
    try {

        const username = document.getElementById("username").value;//alala ti username ken password nga input iti HTML
        const password = document.getElementById("password").value;

        const data = {//papa ka storan na jay data nga username ken password
            username: username,
            password: password
        };

        const response = await fetch(//ag-fetch ti data nga username ken password iti backend API
            'http://localhost/api/login.php', {//ti URL ti backend API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'//ibag baga na nga json files ti isend nga data iti backend API
                },
                body: JSON.stringify(data)//ibag baga na nga i-convert ti data nga JSON string tapno ma-send iti backend API
            }
        );

        const resData = await response.json();//i anakized na jay bagi ni json gingana malpas then i store na kin resData variable

        console.log(resData);//ti send na jay log yanti console for de bugging porpuses

        if (resData.success) {//i chech na if success ti response nga naggapu iti backend API
            window.location.href = "./dashboard.html";//nu success ti response, i redirect na jay user iti dashboard.html
        } else {
            showError(resData.message);//i send na nga message ti response ti server or jay api
        }

    } catch (error) {
        showError("Error: " + error.message);
        console.error(error);//i send na jay error yanti console for de bugging porpuses
    }
}
async function getData() {
    try {
        const response = await fetch('http://localhost/api/student-list.php');//agala ti response nga naggapu iti backend API para iti student list

        if (!response.ok) {//i chech na if ok ti response nga naggapu iti backend API
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();//i anakized na jay bagi ni json gingana malpas then i store na kin data variable
        console.log(data);//i show na jay data yanti console for de bugging porpuses

        const table = document.getElementById("studentTable");//agala ti table element iti HTML para iti student list
        if (!table) return;//nu awan ti table element, i exit na ti function

        table.innerHTML = "";//i clear na jay table para maipakita ti updated student list

        if (Array.isArray(data.students)) {//i chech na if data.students ket array, tapno maipakita ti student list iti table
            data.students.forEach(student => {
    const row = `
        <tr>
            <td>${student.id}</td>
            <td>${student.student_id}</td>
            <td>${student.first_name}</td>
            <td>${student.last_name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.year_level}</td>
            <td>${student.enrollment_date}</td> 
        </tr>
    `;
    table.innerHTML += row;//i add na jay row iti table para maipakita ti student list
});
        } else {
            console.error("Data.students is not an array:", data.students);//nu data.students ket saan nga array, i send na jay error yanti console for de bugging porpuses

        }

    } catch (error) {//nu adda error iti fetch request, i send na jay error message iti HTML ken jay console for de bugging porpuses
        console.error(error);
    }
}


