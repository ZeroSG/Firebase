const db=firebase.firestore();
const table=document.querySelector('#tbresult')
const form=document.querySelector('#addForm')



db.collection('GoogleMaps').get().then((snapshot) => {
    snapshot.forEach(doc=>{
        showData(doc);
    });
});
// เพิ่มข้อมูล
form.addEventListener('submit',(e)=>{
        e.preventDefault();
        db.collection('GoogleMaps').add({
            name:form.name.value,
            image:form.image.value,
            material:form.material.value,
            latitude:form.latitude.value,
            longitude:form.longitude.value,

        });
});


// แสดงข่อมูล
function showData(doc) {
    var row=table.insertRow(-1);
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    var cell3=row.insertCell(2);
    var cell4=row.insertCell(3);
    var cell5=row.insertCell(4);
    var cell6=row.insertCell(5);
    cell1.innerHTML=doc.data().name;
    cell2.innerHTML=doc.data().image;
    cell3.innerHTML=doc.data().material;
    cell4.innerHTML=doc.data().latitude;
    cell5.innerHTML=doc.data().longitude;
    
     //ลบ
    let btn=document.createElement('button');
    btn.textContent='ลบ';
    btn.setAttribute('class', 'btn btn-danger');
    btn.setAttribute('data-id', doc.id);
    cell6.appendChild(btn);

    btn.addEventListener('click',(e)=>{
               let id = e.target.getAttribute('data-id');
               db.collection('GoogleMaps').doc(id).delete();
    });
}