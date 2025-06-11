function saveAttachmentsToDrive() {
  const threads = GmailApp.search('has:attachment newer_than:7d');
  const folderMap = {
    "invoice": "Invoices",
    "receipt": "Receipts",
    "report": "Reports"
  };

  threads.forEach(thread => {
    const messages = thread.getMessages();
    messages.forEach(msg => {
      const attachments = msg.getAttachments();
      attachments.forEach(file => {
        const subject = msg.getSubject().toLowerCase();
        for (const keyword in folderMap) {
          if (subject.includes(keyword)) {
            const folder = DriveApp.getFoldersByName(folderMap[keyword]).next();
            folder.createFile(file);
            break;
          }
        }
      });
    });
  });
}
