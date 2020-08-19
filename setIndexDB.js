window.indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction ||
  window.webkitIDBTransaction ||
  window.msIDBTransaction || { READ_WRITE: "readwrite" };

window.IDBKeyRange =
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
  console.log(
    "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  );
}
var request = window.indexedDB.open("MyTestDatabase", 3);

request.onerror = function (event) {
  // Do something with request.errorCode!
  console.log("Error => ", event);
};
request.onsuccess = function (event) {
  console.log("Success => ", event);
  var db = event.target.result;

  db.onerror = function (event) {
    // Generic error handler for all errors targeted at this database's
    // requests!
    console.error("Database error: " + event.target.errorCode);
  };
};

const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
];

request.onupgradeneeded = (event) => {
  var db = event.target.result;

  var objectStore = db.createObjectStore("chapters", { keyPath: "id" });

  objectStore.createIndex("name", "name");
  objectStore.createIndex("email", "email");

  objectStore.transaction.oncomplete = function (event) {
    // Store values in the newly created objectStore.
    console.log("T");
    var customerObjectStore = db
      .transaction("chapters", "readwrite")
      .objectStore("chapters");
    customerData.forEach(function (customer) {
      customerObjectStore.add(customer);
    });
  };
};
