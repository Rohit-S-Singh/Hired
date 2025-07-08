import EmailEditor from './EmailEditor.tsx';

// In your /email-editor page component:
function EmailEditorPage() {
  const handleSave = (emailData) => {
    console.log('Saving email:', emailData);
    // Your save logic here
  };

  const handleSend = (emailData) => {
    console.log('Sending email:', emailData);
    // Your send logic here
  };

  const showNotification = (message, type) => {
    // Your notification logic here
    console.log(`${type}: ${message}`);
  };

  return (
    <EmailEditor
      initialContent="<p>Start with your custom content...</p>"
      onSave={handleSave}
      onSend={handleSend}
      showToNotification={showNotification}
    />
  );
}
export default EmailEditorPage;
