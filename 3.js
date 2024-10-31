var xhr = new XMLHttpRequest();

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('contactId').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
	var method = 'POST'; // 请求方法可以是GET或POST等
	var url = 'http://8.134.60.238:5000/addAddressBook' // 请求的目标地址
	xhr.open(method, url, true); // 使用open方法设置请求方法和URL
	xhr.setRequestHeader('Content-Type', 'application/json');
	var data = {
		id:id,
		name:name,
		phone:phone,
		email:email,
	}; // 请求体中的数据
	xhr.send(JSON.stringify(data)); // 将数据作为参数发送
    document.getElementById('contactForm').reset();
    document.getElementById('contactId').value = '';
});

function fetchContacts() {
    fetch("http://8.134.60.238:5000/getAddressBook")
        .then(response => response.json())
        .then(contacts => {
            const tbody = document.querySelector('#contactTable tbody');
            tbody.innerHTML = ''; 

            contacts.forEach(contact => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${contact.name}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.email}</td>
                    <td>
                        <button onclick="editContact('${contact.id}', '${contact.name}', '${contact.phone}', '${contact.email}')">编辑</button>
                        <button onclick="deleteContact('${contact.id}')">删除</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
}

function editContact(id, name, phone, email) {
    document.getElementById('contactId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('phone').value = phone;
    document.getElementById('email').value = email;
	var method = 'POST'; // 请求方法可以是GET或POST等
	var url = 'http://8.134.60.238:5000/addAddressBook' // 请求的目标地址
	xhr.open(method, url, true); // 使用open方法设置请求方法和URL
	xhr.setRequestHeader('Content-Type', 'application/json');
	var data = {
		id:id,
		name:name,
		phone:phone,
		email:email,
	}; // 请求体中的数据
	xhr.send(JSON.stringify(data)); // 将数据作为参数发送
	
}

function deleteContact(id) {
	var method = 'POST'; // 请求方法可以是GET或POST等
	var url = 'http://8.134.60.238:5000/deleteAddressBook' // 请求的目标地址
	xhr.open(method, url, true); // 使用open方法设置请求方法和URL
	xhr.setRequestHeader('Content-Type', 'application/json');
	var data = {
		id:id
	}; // 请求体中的数据
	xhr.send(JSON.stringify(data)); // 将数据作为参数发送
}

fetchContacts();
