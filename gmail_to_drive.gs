function organizeGmailAttachments() {
  var threads = GmailApp.search('has:attachment');
  var folderMap = {
    'Invoice': 'Invoices',
    'Receipt': 'Receipts',
    'Resume': 'Resumes'
  };

  var driveRoot = DriveApp.getFolderById('YOUR_FOLDER_ID'); // Replace with your Drive folder ID

  threads.forEach(function(thread) {
    var messages = thread.getMessages();
    messages.forEach(function(message) {
      var subject = message.getSubject();
      var attachments = message.getAttachments();
      attachments.forEach(function(file) {
        for (var keyword in folderMap) {
          if (subject.includes(keyword)) {
            var folder = driveRoot.getFoldersByName(folderMap[keyword]);
            if (folder.hasNext()) {
              folder.next().createFile(file);
            }
          }
        }
      });
    });
  });
}
