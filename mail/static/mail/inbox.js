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

    //display emails
    var i;
    for (i = 0; i < emails.length; i++) {
    var newDiv = document.createElement("div"); 
    newDiv.className = "email-class";
    newDiv.style.border = "thin solid";
    newDiv.style.borderColor = "black";
    newDiv.style.padding = "15px";
    newDiv.style.marginLeft = "210px";
    newDiv.style.marginRight = "210px";
    let a = sender[i];
    let b = subject[i];
    let c = timestamp[i];
    newDiv.innerHTML = `${a}  ${b}  ${c}`;
    document.body.appendChild(newDiv);
    }
    });

}