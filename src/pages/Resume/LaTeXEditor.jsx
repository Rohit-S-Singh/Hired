import React, { useState } from "react";
import { Save, Download, Eye, Code, FileText, RefreshCw, Copy, Check } from "lucide-react";

const LaTeXEditor = ({ darkMode = false }) => {
  const [latexCode, setLatexCode] = useState(`\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape John Anderson} \\\\ \\vspace{1pt}
    \\small +1-555-123-4567 $|$ \\href{mailto:john.anderson@email.com}{\\underline{john.anderson@email.com}} $|$ 
    \\href{https://linkedin.com/in/johnanderson}{\\underline{linkedin.com/in/johnanderson}} $|$
    \\href{https://github.com/johnanderson}{\\underline{github.com/johnanderson}}
\\end{center}

\\section{Experience}
  \\textbf{Senior Software Engineer} \\hfill Jan 2021 -- Present \\\\
  \\textit{Tech Corp, San Francisco, CA} \\\\
  \\vspace{-7pt}
  \\begin{itemize}[leftmargin=0.15in, label={--}]
    \\item Led development of microservices architecture serving 1M+ users
    \\item Mentored team of 5 junior developers and implemented CI/CD pipelines
    \\item Improved application performance by 40\\% through optimization
  \\end{itemize}
  
  \\textbf{Software Engineer} \\hfill Jun 2019 -- Jan 2021 \\\\
  \\textit{StartupXYZ, San Francisco, CA} \\\\
  \\vspace{-7pt}
  \\begin{itemize}[leftmargin=0.15in, label={--}]
    \\item Developed full-stack web applications using React and Node.js
    \\item Collaborated with design team to implement responsive UI components
  \\end{itemize}

\\section{Education}
  \\textbf{University of California, Berkeley} \\hfill May 2019 \\\\
  \\textit{Bachelor of Science in Computer Science} \\\\
  GPA: 3.8/4.0

\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\item{
     \\textbf{Languages}{: JavaScript, Python, Java, C++, SQL} \\\\
     \\textbf{Frameworks}{: React, Node.js, Express, Django, Spring Boot} \\\\
     \\textbf{Tools}{: Git, Docker, AWS, MongoDB, PostgreSQL}
    }
 \\end{itemize}

\\section{Projects}
  \\textbf{E-Commerce Platform} $|$ \\emph{React, Node.js, MongoDB, Stripe} \\\\
  \\vspace{-7pt}
  \\begin{itemize}[leftmargin=0.15in, label={--}]
    \\item Built full-stack platform with payment integration and admin dashboard
    \\item Implemented user authentication and shopping cart functionality
  \\end{itemize}

\\end{document}`);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [jobDescription, setJobDescription] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [showJobInput, setShowJobInput] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([latexCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '', 'height=800,width=800');
    printWindow.document.write('<html><head><title>Resume</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { font-family: serif; padding: 40px; }
      h1 { font-size: 24px; margin-bottom: 8px; }
      h2 { font-size: 18px; border-bottom: 1px solid #000; padding-bottom: 4px; margin-top: 20px; margin-bottom: 12px; }
      h3 { font-size: 14px; margin-bottom: 4px; }
      .text-center { text-center; }
      .header { text-align: center; margin-bottom: 24px; }
      .contact { font-size: 11px; margin-top: 8px; }
      .section { margin-bottom: 20px; }
      .job { margin-bottom: 16px; }
      .job-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
      .company { font-style: italic; font-size: 12px; }
      ul { margin: 8px 0; padding-left: 20px; }
      li { font-size: 12px; margin-bottom: 4px; }
      .skills p { font-size: 12px; margin: 4px 0; }
      .bold { font-weight: bold; }
      .italic { font-style: italic; }
      .date { font-size: 12px; }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(`
      <div class="header">
        <h1>JOHN ANDERSON</h1>
        <div class="contact">+1-555-123-4567 | john.anderson@email.com | linkedin.com/in/johnanderson | github.com/johnanderson</div>
      </div>
      
      <div class="section">
        <h2>EXPERIENCE</h2>
        <div class="job">
          <div class="job-header">
            <div>
              <h3>Senior Software Engineer</h3>
              <div class="company">Tech Corp, San Francisco, CA</div>
            </div>
            <span class="date">Jan 2021 - Present</span>
          </div>
          <ul>
            <li>Led development of microservices architecture serving 1M+ users</li>
            <li>Mentored team of 5 junior developers and implemented CI/CD pipelines</li>
            <li>Improved application performance by 40% through optimization</li>
          </ul>
        </div>
        <div class="job">
          <div class="job-header">
            <div>
              <h3>Software Engineer</h3>
              <div class="company">StartupXYZ, San Francisco, CA</div>
            </div>
            <span class="date">Jun 2019 - Jan 2021</span>
          </div>
          <ul>
            <li>Developed full-stack web applications using React and Node.js</li>
            <li>Collaborated with design team to implement responsive UI components</li>
          </ul>
        </div>
      </div>
      
      <div class="section">
        <h2>EDUCATION</h2>
        <div class="job-header">
          <div>
            <h3>University of California, Berkeley</h3>
            <div class="company">Bachelor of Science in Computer Science</div>
            <div class="company">GPA: 3.8/4.0</div>
          </div>
          <span class="date">May 2019</span>
        </div>
      </div>
      
      <div class="section">
        <h2>TECHNICAL SKILLS</h2>
        <div class="skills">
          <p><span class="bold">Languages:</span> JavaScript, Python, Java, C++, SQL</p>
          <p><span class="bold">Frameworks:</span> React, Node.js, Express, Django, Spring Boot</p>
          <p><span class="bold">Tools:</span> Git, Docker, AWS, MongoDB, PostgreSQL</p>
        </div>
      </div>
      
      <div class="section">
        <h2>PROJECTS</h2>
        <div class="job">
          <h3>E-Commerce Platform <span class="italic" style="font-weight: normal; font-size: 12px;">| React, Node.js, MongoDB, Stripe</span></h3>
          <ul>
            <li>Built full-stack platform with payment integration and admin dashboard</li>
            <li>Implemented user authentication and shopping cart functionality</li>
          </ul>
        </div>
      </div>
    `);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(latexCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAIOptimize = () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description first!");
      return;
    }

    setAiGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      // Parse job description for keywords
      const keywords = jobDescription.toLowerCase();
      let optimizedCode = latexCode;

      // Add relevant skills based on job description
      if (keywords.includes('react') || keywords.includes('frontend')) {
        optimizedCode = optimizedCode.replace(
          'React, Node.js, Express, Django, Spring Boot',
          'React, Redux, Next.js, Node.js, Express, Django, Spring Boot, TypeScript'
        );
      }

      if (keywords.includes('aws') || keywords.includes('cloud')) {
        optimizedCode = optimizedCode.replace(
          'Git, Docker, AWS, MongoDB, PostgreSQL',
          'Git, Docker, Kubernetes, AWS, Azure, MongoDB, PostgreSQL, Redis'
        );
      }

      if (keywords.includes('python') || keywords.includes('machine learning')) {
        optimizedCode = optimizedCode.replace(
          'JavaScript, Python, Java, C++, SQL',
          'Python, JavaScript, Java, C++, SQL, TensorFlow, PyTorch'
        );
      }

      // Enhance bullet points with more impact
      optimizedCode = optimizedCode.replace(
        'Led development of microservices architecture serving 1M+ users',
        'Led development of scalable microservices architecture serving 1M+ users, reducing latency by 35\\% and improving system reliability to 99.9\\% uptime'
      );

      optimizedCode = optimizedCode.replace(
        'Mentored team of 5 junior developers and implemented CI/CD pipelines',
        'Mentored and coached team of 5 junior developers, implemented automated CI/CD pipelines reducing deployment time by 60\\%, and established code review best practices'
      );

      // Add a new relevant project if keywords match
      if (keywords.includes('api') || keywords.includes('backend')) {
        const projectsSection = optimizedCode.indexOf('\\section{Projects}');
        if (projectsSection !== -1) {
          const insertPoint = optimizedCode.indexOf('\\end{document}');
          const newProject = `
  
  \\textbf{RESTful API Service} $|$ \\emph{Node.js, Express, PostgreSQL, Docker} \\\\
  \\vspace{-7pt}
  \\begin{itemize}[leftmargin=0.15in, label={--}]
    \\item Designed and developed scalable RESTful API serving 500K+ daily requests
    \\item Implemented JWT authentication and rate limiting for enhanced security
    \\item Achieved 99.95\\% uptime through comprehensive monitoring and testing
  \\end{itemize}`;
          
          optimizedCode = optimizedCode.slice(0, insertPoint) + newProject + '\n\n' + optimizedCode.slice(insertPoint);
        }
      }

      setLatexCode(optimizedCode);
      setAiGenerating(false);
      setShowJobInput(false);
      setJobDescription("");
    }, 3000);
  };

  const renderPreview = () => {
    return (
      <div className={`p-8 font-serif ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">JOHN ANDERSON</h1>
          <div className="text-sm">
            +1-555-123-4567 | john.anderson@email.com | linkedin.com/in/johnanderson | github.com/johnanderson
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-400 pb-1 mb-3">EXPERIENCE</h2>
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">Senior Software Engineer</h3>
                <p className="italic text-sm">Tech Corp, San Francisco, CA</p>
              </div>
              <span className="text-sm">Jan 2021 - Present</span>
            </div>
            <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
              <li>Led development of microservices architecture serving 1M+ users</li>
              <li>Mentored team of 5 junior developers and implemented CI/CD pipelines</li>
              <li>Improved application performance by 40% through optimization</li>
            </ul>
          </div>
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">Software Engineer</h3>
                <p className="italic text-sm">StartupXYZ, San Francisco, CA</p>
              </div>
              <span className="text-sm">Jun 2019 - Jan 2021</span>
            </div>
            <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
              <li>Developed full-stack web applications using React and Node.js</li>
              <li>Collaborated with design team to implement responsive UI components</li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-400 pb-1 mb-3">EDUCATION</h2>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">University of California, Berkeley</h3>
              <p className="italic text-sm">Bachelor of Science in Computer Science</p>
              <p className="text-sm">GPA: 3.8/4.0</p>
            </div>
            <span className="text-sm">May 2019</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-400 pb-1 mb-3">TECHNICAL SKILLS</h2>
          <div className="text-sm">
            <p><span className="font-bold">Languages:</span> JavaScript, Python, Java, C++, SQL</p>
            <p><span className="font-bold">Frameworks:</span> React, Node.js, Express, Django, Spring Boot</p>
            <p><span className="font-bold">Tools:</span> Git, Docker, AWS, MongoDB, PostgreSQL</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold border-b border-gray-400 pb-1 mb-3">PROJECTS</h2>
          <div>
            <h3 className="font-bold">E-Commerce Platform <span className="font-normal italic text-sm">| React, Node.js, MongoDB, Stripe</span></h3>
            <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
              <li>Built full-stack platform with payment integration and admin dashboard</li>
              <li>Implemented user authentication and shopping cart functionality</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              LaTeX Resume Editor
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Edit your resume using LaTeX code
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                  : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
              }`}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied!" : "Copy Code"}
            </button>
            <button
              onClick={handleDownloadPDF}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                darkMode
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              <FileText size={18} />
              Download PDF
            </button>
            <button
              onClick={handleDownload}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                  : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
              }`}
            >
              <Download size={18} />
              Download .tex
            </button>
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                saved
                  ? "bg-green-600 text-white"
                  : saving
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <Save size={18} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor Panel */}
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-lg overflow-hidden flex flex-col`}>
            <div className={`flex items-center justify-between px-4 py-3 border-b ${darkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"}`}>
              <div className="flex items-center gap-2">
                <Code className={darkMode ? "text-blue-400" : "text-blue-600"} size={20} />
                <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  LaTeX Code
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <label className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Font Size:
                </label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className={`px-2 py-1 rounded border text-sm ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value={12}>12px</option>
                  <option value={14}>14px</option>
                  <option value={16}>16px</option>
                  <option value={18}>18px</option>
                </select>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <textarea
                value={latexCode}
                onChange={(e) => setLatexCode(e.target.value)}
                className={`w-full h-full p-4 font-mono resize-none focus:outline-none ${
                  darkMode
                    ? "bg-gray-800 text-gray-100"
                    : "bg-white text-gray-900"
                }`}
                style={{ fontSize: `${fontSize}px`, minHeight: '600px' }}
                spellCheck={false}
              />
            </div>
            <div className={`px-4 py-2 border-t text-xs ${darkMode ? "border-gray-700 bg-gray-750 text-gray-400" : "border-gray-200 bg-gray-50 text-gray-600"}`}>
              Lines: {latexCode.split('\n').length} | Characters: {latexCode.length}
            </div>
          </div>

          {/* Preview Panel */}
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-lg overflow-hidden flex flex-col`}>
            <div className={`flex items-center justify-between px-4 py-3 border-b ${darkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"}`}>
              <div className="flex items-center gap-2">
                <Eye className={darkMode ? "text-green-400" : "text-green-600"} size={20} />
                <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Preview
                </h3>
              </div>
              <div className={`text-xs px-2 py-1 rounded ${darkMode ? "bg-blue-500 bg-opacity-20 text-blue-400" : "bg-blue-100 text-blue-700"}`}>
                Live Preview
              </div>
            </div>
            <div className="flex-1 overflow-auto" style={{ minHeight: '600px' }}>
              {renderPreview()}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className={`mt-6 p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            <FileText size={20} />
            LaTeX Tips
          </h3>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <div>
              <p className="font-medium mb-1">Common Commands:</p>
              <ul className="space-y-1 ml-4">
                <li>• <code className={darkMode ? "text-blue-400" : "text-blue-600"}>\textbf{'{}'}</code> - Bold text</li>
                <li>• <code className={darkMode ? "text-blue-400" : "text-blue-600"}>\textit{'{}'}</code> - Italic text</li>
                <li>• <code className={darkMode ? "text-blue-400" : "text-blue-600"}>\section{'{}'}</code> - Section heading</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">Formatting:</p>
              <ul className="space-y-1 ml-4">
                <li>• Use <code className={darkMode ? "text-blue-400" : "text-blue-600"}>\vspace{'{}'}</code> for vertical spacing</li>
                <li>• Use <code className={darkMode ? "text-blue-400" : "text-blue-600"}>\hfill</code> to align text right</li>
                <li>• Use <code className={darkMode ? "text-blue-400" : "text-blue-600"}>\item</code> for bullet points</li>
              </ul>
            </div>
          </div>
        </div>

        {/* AI Resume Optimizer */}
        <div className={`mt-6 p-6 rounded-xl ${darkMode ? "bg-gradient-to-r from-purple-900 to-blue-900" : "bg-gradient-to-r from-purple-50 to-blue-50"} border-2 ${darkMode ? "border-purple-700" : "border-purple-200"}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className={`text-xl font-bold mb-2 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI Resume Optimizer
              </h3>
              <p className={`text-sm ${darkMode ? "text-purple-200" : "text-purple-700"}`}>
                Paste a job description and let AI optimize your resume with relevant keywords and improvements
              </p>
            </div>
            {!showJobInput && (
              <button
                onClick={() => setShowJobInput(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                Open AI Optimizer
              </button>
            )}
          </div>

          {showJobInput && (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-purple-200" : "text-purple-900"}`}>
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here... (e.g., 'We are looking for a Senior Frontend Developer with expertise in React, TypeScript, and AWS...')"
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                    darkMode
                      ? "bg-gray-800 border-purple-600 text-white placeholder-gray-500 focus:border-purple-400"
                      : "bg-white border-purple-300 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAIOptimize}
                  disabled={aiGenerating || !jobDescription.trim()}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    aiGenerating || !jobDescription.trim()
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : darkMode
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  }`}
                >
                  {aiGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      AI is optimizing your resume...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Optimize Resume with AI
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowJobInput(false);
                    setJobDescription("");
                  }}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-white hover:bg-gray-100 text-gray-900 border-2 border-gray-300"
                  }`}
                >
                  Cancel
                </button>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? "bg-blue-900 bg-opacity-30" : "bg-blue-100"}`}>
                <h4 className={`font-medium mb-2 flex items-center gap-2 ${darkMode ? "text-blue-200" : "text-blue-900"}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How it works:
                </h4>
                <ul className={`space-y-1 text-sm ml-7 ${darkMode ? "text-blue-300" : "text-blue-800"}`}>
                  <li>• Analyzes job description for key skills and requirements</li>
                  <li>• Adds relevant keywords to your skills section</li>
                  <li>• Enhances bullet points with quantifiable achievements</li>
                  <li>• Suggests new projects based on job requirements</li>
                  <li>• Optimizes formatting for ATS compatibility</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaTeXEditor;