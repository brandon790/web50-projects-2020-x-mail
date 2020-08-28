document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);



  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#emails').style.display = 'none';
  
  

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

  //post email
document.addEventListener('submit', function() {
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: document.querySelector("#compose-recipients").value,
      subject: document.querySelector('#compose-subject').value,
      body: document.querySelector('#compose-body').value
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
  })
});

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';


  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;


 //get and show emails
 document.querySelector('#emails-view')
 const emails = []
 fetch(`/emails/${mailbox}`)
 .then(response => response.json())
 .then(emails => {
     // Print emails
     console.log(emails);

     //array of each field
    let sender = emails.map(a => a.sender);
    let subject = emails.map(a => a.subject);
    let timestamp = emails.map(a => a.timestamp);
    let read = emails.map(a => a.read);
    let email_id = emails.map(a => a.id);


    //display emails
    var all_mail = document.createElement("div");
    all_mail.id = "all_mail";
    document.getElementById('emails-view').append(all_mail);

    var i;
    for (i = 0; i < emails.length; i++) {
    var newDiv = document.createElement("div");
    newDiv.style.position = "relative";
    newDiv.style.zIndex = "999";
    newDiv.className = email_id[i];
    newDiv.style.border = "thin solid";
    newDiv.style.borderColor = "black";
    newDiv.style.padding = "15px";
    newDiv.style.marginLeft = "25x";
    newDiv.style.marginRight = "10px";
    let a = sender[i];
    let b = subject[i];
    let c = timestamp[i];
    if (read[i] == true) {
      newDiv.style.backgroundColor = "#DCDCDC";
    }   
    newDiv.innerHTML = `<h5 class=${email_id[i]} style="font-weight:bold">${a}</h5> <h6 class=${email_id[i]}>${b}</h6> <h7 class=${email_id[i]} style="color: gray">${c}</h7>`;
    document.getElementById('all_mail').append(newDiv);

    }


document.addEventListener('click', function(e) {
const clicked = e.target.className
  fetch(`/emails/${clicked}`)
  .then(response => response.json())
  .then(email => {
  // Print email
  email.read = true;
  console.log(email);

  var newDiv_single = document.createElement("div");
  let sender = email.sender;
  let recipients = email.recipients;
  let subject = email.subject;
  let timestamp = email.timestamp;
  let email_id = email.id;
  let body = email.body;
 
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        read: true
    })
  })
  
  
  newDiv_single.innerHTML = `<h6 class=${email_id[i]} style="font-weight:bold">From:</h6><h6> ${sender} </h6> <h6 class=${email_id[i]} style="font-weight:bold">To:</h6><h6> ${recipients} </h6> <h6 class=${email_id[i]} style="font-weight:bold">Subject:</h6><h6> ${subject} </h6> <h6 class=${email_id[i]} style="font-weight:bold">Timestamp:</h6><h6> ${timestamp} </h6> <br> <p> ${body} </p>`;
  document.getElementById("all_mail").replaceWith(newDiv_single);
  var archive_but = document.createElement("BUTTON");
  archive_but.id = "archive";
  archive_but.innerHTML = "Archive";
  document.getElementById("emails-view").append(archive_but);
/// need to unarchive emails
  document.querySelector('#archive').addEventListener('click', function() {
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: true
    })
  }) 
  ;
})})})})}