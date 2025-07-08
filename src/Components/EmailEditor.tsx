import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  TextField,
  Grid,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatListBulleted,
  FormatListNumbered,
  AddCircle,
  ContentCopy,
  Download,
  Add
} from '@mui/icons-material';

interface EmailData {
  to: string;
  subject: string;
  content: string;
}

interface PreviewData {
  firstName: string;
  lastName: string;
  company: string;
  position: string;
  email: string;
  date: string;
}

interface DynamicVariable {
  id: number;
  name: string;
  label: string;
  defaultValue?: string;
}

interface EmailEditorProps {
  initialContent?: string;
  onSave?: (emailData: EmailData) => void;
  onSend?: (emailData: EmailData) => void;
  showToNotification?: (message: string, type?: 'success' | 'error') => void;
}

const EmailEditor: React.FC<EmailEditorProps> = ({
  initialContent = '',
  onSave,
  onSend,
  showToNotification
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [emailData, setEmailData] = useState<EmailData>({
    to: "",
    subject: "",
    content: initialContent || `<p>Dear <span class="dynamic-variable" data-variable="firstName">{{firstName}}</span> <span class="dynamic-variable" data-variable="lastName">{{lastName}}</span>,</p><br><p>I hope this email finds you well. I wanted to reach out regarding the opportunity at <span class="dynamic-variable" data-variable="company">{{company}}</span>.</p><br><p>Based on your experience as a <span class="dynamic-variable" data-variable="position">{{position}}</span>, I believe you would be an excellent fit for our team.</p><br><p>Best regards,<br>Your Name</p>`
  });

  const [previewData, setPreviewData] = useState<PreviewData>({
    firstName: "Sarah",
    lastName: "Johnson", 
    company: "TechCorp Inc.",
    position: "Senior Developer",
    email: "sarah.johnson@techcorp.com",
    date: new Date().toLocaleDateString()
  });

  const [showDynamicPanel, setShowDynamicPanel] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [variables, setVariables] = useState<DynamicVariable[]>([
    { id: 1, name: "firstName", label: "First Name", defaultValue: "John" },
    { id: 2, name: "lastName", label: "Last Name", defaultValue: "Doe" },
    { id: 3, name: "company", label: "Company", defaultValue: "Example Corp" },
    { id: 4, name: "position", label: "Position", defaultValue: "Manager" },
    { id: 5, name: "email", label: "Email Address", defaultValue: "john.doe@example.com" },
    { id: 6, name: "date", label: "Current Date", defaultValue: new Date().toLocaleDateString() }
  ]);
  
  const [newVariable, setNewVariable] = useState({
    name: "",
    label: "",
    defaultValue: "",
  });

  const editorRef = useRef<HTMLDivElement>(null);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    if (showToNotification) {
      showToNotification(message, type);
    } else {
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  };

  const handleEmailDataChange = useCallback((field: keyof EmailData, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handlePreviewDataChange = useCallback((field: keyof PreviewData, value: string) => {
    setPreviewData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Rich Text Editor Logic
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== emailData.content) {
      editorRef.current.innerHTML = emailData.content;
    }
  }, [emailData.content]);

  useEffect(() => {
    const handleInsertVariable = (event: CustomEvent) => {
      const { variable } = event.detail;
      
      if (editorRef.current) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const span = document.createElement('span');
          span.className = 'dynamic-variable';
          span.setAttribute('data-variable', variable.replace(/[{}]/g, ''));
          span.style.background = '#fff3e0';
          span.style.padding = '2px 6px';
          span.style.borderRadius = '4px';
          span.style.border = '1px dashed #ff9800';
          span.style.color = '#e65100';
          span.style.fontWeight = '500';
          span.textContent = variable;
          
          range.deleteContents();
          range.insertNode(span);
          
          range.setStartAfter(span);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
          
          if (editorRef.current) {
            handleEmailDataChange("content", editorRef.current.innerHTML);
          }
        }
      }
    };

    document.addEventListener('insertVariable', handleInsertVariable as EventListener);
    
    return () => {
      document.removeEventListener('insertVariable', handleInsertVariable as EventListener);
    };
  }, [handleEmailDataChange]);

  const handleInput = () => {
    if (editorRef.current) {
      handleEmailDataChange("content", editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleFormatCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const handleInsertVariable = (variable: DynamicVariable) => {
    const event = new CustomEvent('insertVariable', { detail: { variable: `{{${variable.name}}}` } });
    document.dispatchEvent(event);
  };

  const handleAddVariable = () => {
    if (!newVariable.name || !newVariable.label) {
      notify("Please provide both name and label for the variable.", 'error');
      return;
    }
    
    const id = Math.max(...variables.map(v => v.id), 0) + 1;
    setVariables(prev => [...prev, { ...newVariable, id }]);
    setShowAddDialog(false);
    setNewVariable({ name: "", label: "", defaultValue: "" });
    notify("Variable added successfully.");
  };

  const handleSaveDraft = () => {
    if (onSave) {
      onSave(emailData);
    }
    notify("Draft saved successfully.");
  };

  const handleSendEmail = () => {
    if (!emailData.to || !emailData.subject || !emailData.content) {
      notify("Please fill in all required fields before sending.", 'error');
      return;
    }
    
    if (onSend) {
      onSend(emailData);
    }
    notify("Email sent successfully.");
  };

  // Preview Logic
  const replaceVariables = (content: string): string => {
    return content
      .replace(/\{\{firstName\}\}/g, previewData.firstName)
      .replace(/\{\{lastName\}\}/g, previewData.lastName)
      .replace(/\{\{company\}\}/g, previewData.company)
      .replace(/\{\{position\}\}/g, previewData.position)
      .replace(/\{\{email\}\}/g, previewData.email)
      .replace(/\{\{date\}\}/g, previewData.date);
  };

  const handleCopyToClipboard = () => {
    const previewElement = document.getElementById('email-preview-content');
    if (previewElement) {
      const textContent = previewElement.textContent || '';
      navigator.clipboard.writeText(textContent).then(() => {
        notify("Email content copied to clipboard.");
      });
    }
  };

  const handleExportHTML = () => {
    const htmlContent = replaceVariables(emailData.content);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    notify("Email template exported as HTML file.");
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Editor Section */}
        <Box
          sx={{
            width: isMobile ? "100%" : "60%",
            display: "flex",
            flexDirection: "column",
            borderRight: !isMobile ? `1px solid ${theme.palette.divider}` : "none",
          }}
        >
          {/* Email Header Fields */}
          <Paper sx={{ p: 3, borderRadius: 0 }} elevation={0}>
            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    To
                  </Typography>
                  <TextField
                    type="email"
                    placeholder="recipient@example.com"
                    value={emailData.to}
                    onChange={(e) => handleEmailDataChange("to", e.target.value)}
                    size="small"
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Subject
                  </Typography>
                  <TextField
                    type="text"
                    placeholder="Email subject"
                    value={emailData.subject}
                    onChange={(e) => handleEmailDataChange("subject", e.target.value)}
                    size="small"
                    fullWidth
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Formatting Toolbar */}
          <Paper 
            sx={{ 
              p: 2, 
              borderRadius: 0, 
              bgcolor: "grey.50",
              borderTop: 1,
              borderBottom: 1,
              borderColor: "divider"
            }} 
            elevation={0}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              {/* Text Formatting */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title="Bold">
                  <IconButton size="small" onClick={() => handleFormatCommand("bold")}>
                    <FormatBold />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Italic">
                  <IconButton size="small" onClick={() => handleFormatCommand("italic")}>
                    <FormatItalic />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Underline">
                  <IconButton size="small" onClick={() => handleFormatCommand("underline")}>
                    <FormatUnderlined />
                  </IconButton>
                </Tooltip>
              </Box>

              <Divider orientation="vertical" flexItem />

              {/* Alignment */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title="Align Left">
                  <IconButton size="small" onClick={() => handleFormatCommand("justifyLeft")}>
                    <FormatAlignLeft />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Align Center">
                  <IconButton size="small" onClick={() => handleFormatCommand("justifyCenter")}>
                    <FormatAlignCenter />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Align Right">
                  <IconButton size="small" onClick={() => handleFormatCommand("justifyRight")}>
                    <FormatAlignRight />
                  </IconButton>
                </Tooltip>
              </Box>

              <Divider orientation="vertical" flexItem />

              {/* Lists */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title="Bullet List">
                  <IconButton size="small" onClick={() => handleFormatCommand("insertUnorderedList")}>
                    <FormatListBulleted />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Numbered List">
                  <IconButton size="small" onClick={() => handleFormatCommand("insertOrderedList")}>
                    <FormatListNumbered />
                  </IconButton>
                </Tooltip>
              </Box>

              <Divider orientation="vertical" flexItem />

              {/* Dynamic Text Button */}
              <Button
                variant={showDynamicPanel ? "contained" : "outlined"}
                startIcon={<AddCircle />}
                size="small"
                onClick={() => setShowDynamicPanel(!showDynamicPanel)}
              >
                Dynamic Text
              </Button>
            </Box>
          </Paper>

          {/* Dynamic Text Panel */}
          {showDynamicPanel && (
            <Paper 
              sx={{ 
                p: 3, 
                bgcolor: "blue.50", 
                borderRadius: 0,
                borderBottom: 1,
                borderColor: "blue.200"
              }} 
              elevation={0}
            >
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
                Available Dynamic Text Variables
              </Typography>
              
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {variables.map((variable) => (
                  <Chip
                    key={variable.id}
                    label={variable.label}
                    onClick={() => handleInsertVariable(variable)}
                    sx={{
                      bgcolor: "blue.100",
                      color: "blue.800",
                      border: 1,
                      borderColor: "blue.300",
                      "&:hover": {
                        bgcolor: "blue.200",
                      },
                      cursor: "pointer",
                    }}
                  />
                ))}
              </Box>

              <Button
                startIcon={<Add />}
                size="small"
                onClick={() => setShowAddDialog(true)}
                sx={{ color: "primary.main" }}
              >
                Add Custom Variable
              </Button>
            </Paper>
          )}

          {/* Rich Text Editor */}
          <Box sx={{ flex: 1, p: 3 }}>
            <Paper 
              sx={{ 
                minHeight: 400, 
                p: 2, 
                border: 1, 
                borderColor: "divider",
                bgcolor: "background.paper"
              }} 
              elevation={0}
            >
              <Box
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onPaste={handlePaste}
                sx={{
                  minHeight: 350,
                  outline: "none",
                  lineHeight: 1.6,
                  fontSize: "14px",
                  "& .dynamic-variable": {
                    background: "#fff3e0",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    border: "1px dashed #ff9800",
                    color: "#e65100",
                    fontWeight: 500,
                  },
                  "&:empty::before": {
                    content: '"Start composing your email..."',
                    color: "text.secondary",
                    fontStyle: "italic",
                  },
                }}
              />
            </Paper>
          </Box>

          {/* Action Buttons */}
          <Paper sx={{ p: 2, borderRadius: 0 }} elevation={0}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={handleSaveDraft}>
                Save Draft
              </Button>
              <Button variant="contained" onClick={handleSendEmail}>
                Send Email
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Preview Section */}
        {!isMobile && (
          <Box sx={{ width: "40%", bgcolor: "grey.50", p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6" component="h2">
                Email Preview
              </Typography>
              <Button
                startIcon={<ContentCopy />}
                size="small"
                onClick={handleCopyToClipboard}
                sx={{ color: "primary.main" }}
              >
                Copy
              </Button>
            </Box>

            {/* Sample Data Controls */}
            <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
                Sample Data for Preview
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <TextField
                    label="First Name"
                    size="small"
                    fullWidth
                    value={previewData.firstName}
                    onChange={(e) => handlePreviewDataChange("firstName", e.target.value)}
                  />
                </Grid>
                <Grid xs={6}>
                  <TextField
                    label="Last Name"
                    size="small"
                    fullWidth
                    value={previewData.lastName}
                    onChange={(e) => handlePreviewDataChange("lastName", e.target.value)}
                  />
                </Grid>
                <Grid xs={6}>
                  <TextField
                    label="Company"
                    size="small"
                    fullWidth
                    value={previewData.company}
                    onChange={(e) => handlePreviewDataChange("company", e.target.value)}
                  />
                </Grid>
                <Grid xs={6}>
                  <TextField
                    label="Position"
                    size="small"
                    fullWidth
                    value={previewData.position}
                    onChange={(e) => handlePreviewDataChange("position", e.target.value)}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Email Preview Display */}
            <Paper sx={{ p: 3 }} elevation={1}>
              {/* Email Header */}
              <Box sx={{ pb: 2, mb: 2, borderBottom: 1, borderColor: "divider" }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  To: {emailData.to || "recipient@example.com"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Subject: {emailData.subject || "Email Subject"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>

              {/* Email Content */}
              <Box
                id="email-preview-content"
                sx={{
                  lineHeight: 1.6,
                  color: "text.primary",
                  "& p": {
                    margin: "0 0 1rem 0",
                  },
                  "& br": {
                    display: "block",
                    marginBottom: "1rem",
                  },
                }}
                dangerouslySetInnerHTML={{
                  __html: replaceVariables(emailData.content)
                    .replace(/class="dynamic-variable[^"]*"/g, 'style="background: #fff3e0; padding: 2px 6px; border-radius: 4px; border: 1px dashed #ff9800; color: #e65100; font-weight: 500;"')
                }}
              />
            </Paper>

            {/* Export Options */}
            <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleExportHTML}
                size="small"
                fullWidth
              >
                Export HTML
              </Button>
              <Button
                variant="outlined"
                startIcon={<ContentCopy />}
                onClick={handleCopyToClipboard}
                size="small"
                fullWidth
              >
                Copy Text
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Add Variable Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Custom Variable</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Variable Name"
              placeholder="e.g., customerName"
              value={newVariable.name}
              onChange={(e) => setNewVariable(prev => ({ ...prev, name: e.target.value }))}
              size="small"
              fullWidth
            />
            <TextField
              label="Display Label"
              placeholder="e.g., Customer Name"
              value={newVariable.label}
              onChange={(e) => setNewVariable(prev => ({ ...prev, label: e.target.value }))}
              size="small"
              fullWidth
            />
            <TextField
              label="Default Value (Optional)"
              placeholder="e.g., John Doe"
              value={newVariable.defaultValue}
              onChange={(e) => setNewVariable(prev => ({ ...prev, defaultValue: e.target.value }))}
              size="small"
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddVariable} variant="contained">
            Add Variable
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmailEditor;