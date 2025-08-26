// Sample profile data
const sampleProfileData = `Software Engineer at Tech Corp

Experienced software engineer with 5 years in full-stack development. Passionate about building scalable applications using React, Node.js, and cloud technologies.

Experience:
• Software Engineer at Tech Corp (2020-Present)
- Developed web applications using React and Node.js
- Collaborated with cross-functional teams
- Implemented CI/CD pipelines

Skills: JavaScript, React, Node.js, Python, AWS, Docker`;

// Analysis results data
const mockAnalysisResults = {
  overallScore: 72,
  sections: {
    headline: { 
      score: 65, 
      feedback: "Good but could be more impactful", 
      recommendation: "Add specific technologies and years of experience" 
    },
    summary: { 
      score: 78, 
      feedback: "Solid foundation with relevant experience", 
      recommendation: "Add quantifiable achievements and metrics" 
    },
    experience: { 
      score: 70, 
      feedback: "Good structure but lacks impact metrics", 
      recommendation: "Use action verbs and add specific results" 
    },
    skills: { 
      score: 75, 
      feedback: "Good technical coverage", 
      recommendation: "Organize by categories and add soft skills" 
    }
  },
  recommendations: [
    "Add professional headshot to increase profile views",
    "Include quantifiable achievements in experience section", 
    "Expand network by connecting with industry professionals",
    "Request recommendations from colleagues",
    "Share industry insights regularly"
  ]
};

// Global variables
let currentInputMode = 'text';
let selectedImages = [];
let ocrProgress = 0;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  setupDragAndDrop();
});

function setupEventListeners() {
  // Get Started buttons
  const getStartedBtn = document.querySelector('.get-started-btn');
  const heroCta = document.querySelector('.hero-cta');
  
  if (getStartedBtn) {
    getStartedBtn.onclick = () => scrollToSection('analyzer');
  }
  
  if (heroCta) {
    heroCta.onclick = () => scrollToSection('analyzer');
  }
  
  // Load Sample button
  const loadSampleBtn = document.querySelector('.load-sample-btn');
  if (loadSampleBtn) {
    loadSampleBtn.onclick = loadSampleProfile;
  }
  
  // Analyze buttons
  const analyzeBtn = document.querySelector('.analyze-btn');
  if (analyzeBtn) {
    analyzeBtn.onclick = analyzeProfile;
  }
  
  // Download button
  const downloadBtn = document.querySelector('.download-btn');
  if (downloadBtn) {
    downloadBtn.onclick = downloadReport;
  }

  // Image upload handler
  const imageUpload = document.getElementById('image-upload');
  if (imageUpload) {
    imageUpload.addEventListener('change', handleImageSelection);
  }
}

function setupDragAndDrop() {
  const uploadArea = document.getElementById('upload-area');
  if (!uploadArea) return;

  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
  });

  // Highlight drop area when item is dragged over it
  ['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, unhighlight, false);
  });

  // Handle dropped files
  uploadArea.addEventListener('drop', handleDrop, false);
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  document.getElementById('upload-area').classList.add('dragover');
}

function unhighlight(e) {
  document.getElementById('upload-area').classList.remove('dragover');
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles(files);
}

function switchInputMode(mode) {
  currentInputMode = mode;
  
  // Update toggle buttons
  document.getElementById('text-mode-btn').classList.toggle('active', mode === 'text');
  document.getElementById('image-mode-btn').classList.toggle('active', mode === 'image');
  
  // Show/hide input sections
  document.getElementById('text-input-section').style.display = mode === 'text' ? 'block' : 'none';
  document.getElementById('image-input-section').style.display = mode === 'image' ? 'block' : 'none';
  
  // Hide results and other sections
  hideAllProcessingSections();
}

function handleImageSelection(event) {
  const files = event.target.files;
  handleFiles(files);
}

function handleFiles(files) {
  const fileArray = Array.from(files);
  const validImages = fileArray.filter(file => {
    const isImage = file.type.startsWith('image/');
    const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
    return isImage && isValidSize;
  });

  if (validImages.length === 0) {
    showNotification('❌ Please select valid image files (JPG, PNG, WebP) under 10MB each.');
    return;
  }

  selectedImages = [...selectedImages, ...validImages];
  displayImagePreviews();
  showNotification(`✅ ${validImages.length} image(s) selected successfully!`);
}

function displayImagePreviews() {
  const previewSection = document.getElementById('image-preview');
  const previewContainer = document.getElementById('preview-container');
  
  if (selectedImages.length === 0) {
    previewSection.style.display = 'none';
    return;
  }

  previewSection.style.display = 'block';
  previewContainer.innerHTML = '';

  selectedImages.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const previewItem = document.createElement('div');
      previewItem.className = 'preview-item';
      previewItem.innerHTML = `
        <img src="${e.target.result}" alt="Preview ${index + 1}" class="preview-img">
        <div class="preview-info">${file.name}</div>
        <button class="preview-remove" onclick="removeImage(${index})" title="Remove image">×</button>
      `;
      previewContainer.appendChild(previewItem);
    };
    reader.readAsDataURL(file);
  });
}

function removeImage(index) {
  selectedImages.splice(index, 1);
  displayImagePreviews();
  
  if (selectedImages.length === 0) {
    document.getElementById('image-upload').value = '';
  }
  
  showNotification('🗑️ Image removed successfully!');
}

function clearImages() {
  selectedImages = [];
  document.getElementById('image-upload').value = '';
  document.getElementById('image-preview').style.display = 'none';
  document.getElementById('extracted-text-section').style.display = 'none';
  hideAllProcessingSections();
  showNotification('🗑️ All images cleared!');
}

async function extractTextFromImages() {
  if (selectedImages.length === 0) {
    showNotification('❌ Please select at least one image first.');
    return;
  }

  // Show OCR processing indicator
  showOCRProcessing();
  
  let extractedText = '';
  let processedImages = 0;
  
  try {
    for (let i = 0; i < selectedImages.length; i++) {
      const file = selectedImages[i];
      
      updateOCRProgress(processedImages, selectedImages.length, `Processing ${file.name}...`);
      
      // Use Tesseract.js to extract text
      const { data: { text } } = await Tesseract.recognize(file, 'eng', {
        logger: m => {
          if (m.status === 'recognizing text') {
            const progress = Math.round(m.progress * 100);
            updateOCRProgress(processedImages, selectedImages.length, `Extracting text: ${progress}%`);
          }
        }
      });
      
      extractedText += `\n--- From ${file.name} ---\n${text}\n`;
      processedImages++;
    }
    
    // Clean up extracted text
    extractedText = cleanUpExtractedText(extractedText);
    
    // Hide OCR processing and show extracted text
    hideOCRProcessing();
    showExtractedText(extractedText);
    
    showNotification('✅ Text extracted successfully! Review and analyze your profile.');
    
  } catch (error) {
    console.error('OCR Error:', error);
    hideOCRProcessing();
    showNotification('❌ Error extracting text from images. Please try again or use manual input.');
  }
}

function cleanUpExtractedText(text) {
  return text
    .replace(/--- From .* ---/g, '') // Remove file separators
    .replace(/\n{3,}/g, '\n\n') // Replace multiple line breaks with double
    .replace(/[^\w\s\n\-•.,()]/g, ' ') // Remove special characters but keep basic punctuation
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
}

function showOCRProcessing() {
  hideAllProcessingSections();
  document.getElementById('ocr-processing').style.display = 'block';
  ocrProgress = 0;
  updateOCRProgress(0, selectedImages.length, 'Starting OCR processing...');
}

function hideOCRProcessing() {
  document.getElementById('ocr-processing').style.display = 'none';
}

function updateOCRProgress(completed, total, status) {
  const progressPercent = Math.round((completed / total) * 100);
  document.getElementById('ocr-progress').style.width = `${progressPercent}%`;
  document.getElementById('progress-text').textContent = `${progressPercent}%`;
  document.getElementById('ocr-status').textContent = status;
}

function showExtractedText(text) {
  const extractedTextSection = document.getElementById('extracted-text-section');
  const extractedTextArea = document.getElementById('extracted-text');
  
  extractedTextArea.value = text;
  extractedTextSection.style.display = 'block';
  
  // Scroll to extracted text
  setTimeout(() => {
    extractedTextSection.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function enableTextEditing() {
  const extractedTextArea = document.getElementById('extracted-text');
  extractedTextArea.focus();
  extractedTextArea.select();
  showNotification('✏️ You can now edit the extracted text before analysis.');
}

function analyzeExtractedText() {
  const extractedText = document.getElementById('extracted-text').value.trim();
  
  if (!extractedText) {
    showNotification('❌ No text found to analyze. Please extract text from images first.');
    return;
  }
  
  // Use the extracted text for analysis
  analyzeProfileWithText(extractedText);
}

function hideAllProcessingSections() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'none';
  document.getElementById('ocr-processing').style.display = 'none';
  document.getElementById('extracted-text-section').style.display = 'none';
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function loadSampleProfile() {
  if (currentInputMode === 'text') {
    const textarea = document.getElementById('profile-input');
    if (textarea) {
      textarea.value = sampleProfileData;
      textarea.focus();
      showNotification('✅ Sample profile loaded! Click "Analyze Profile" to see results.');
    }
  } else {
    showNotification('🔄 Switch to "Enter Text" mode to load sample profile.');
  }
}

function analyzeProfile() {
  if (currentInputMode === 'text') {
    const profileInput = document.getElementById('profile-input');
    if (!profileInput || !profileInput.value.trim()) {
      showNotification('❌ Please enter your LinkedIn profile content first.');
      return;
    }
    analyzeProfileWithText(profileInput.value.trim());
  } else {
    showNotification('🔄 Please extract text from images first or switch to text input mode.');
  }
}

function analyzeProfileWithText(profileText) {
  const loading = document.getElementById('loading');
  const results = document.getElementById('results');
  
  // Hide other sections and show loading
  hideAllProcessingSections();
  if (loading) loading.style.display = 'block';
  
  // Scroll to loading section
  setTimeout(() => {
    if (loading) {
      loading.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
  
  // Simulate analysis delay
  setTimeout(() => {
    displayResults();
  }, 3000);
}

function displayResults() {
  const loading = document.getElementById('loading');
  const results = document.getElementById('results');
  
  // Hide loading and show results
  if (loading) loading.style.display = 'none';
  if (results) {
    results.style.display = 'block';
    
    // Scroll to results
    setTimeout(() => {
      results.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
  
  // Update overall score
  updateOverallScore();
  
  // Update section scores
  updateSectionScores();
  
  // Update recommendations
  updateRecommendations();
  
  showNotification('✅ Analysis complete! Check your results below.');
}

function updateOverallScore() {
  const scoreElement = document.getElementById('overall-score');
  const progressElement = document.getElementById('score-progress');
  
  if (scoreElement && progressElement) {
    // Animate score counting
    animateScore(scoreElement, mockAnalysisResults.overallScore);
    
    // Animate progress bar
    setTimeout(() => {
      progressElement.style.width = mockAnalysisResults.overallScore + '%';
    }, 500);
  }
}

function updateSectionScores() {
  const sections = ['headline', 'summary', 'experience', 'skills'];
  
  sections.forEach((sectionName, index) => {
    setTimeout(() => {
      const sectionData = mockAnalysisResults.sections[sectionName];
      const sectionElement = document.getElementById(`${sectionName}-section`);
      
      if (sectionElement && sectionData) {
        const scoreElement = sectionElement.querySelector('.section-score');
        const feedbackElement = sectionElement.querySelector('.section-feedback');
        const recommendationElement = sectionElement.querySelector('.section-recommendation span');
        
        if (scoreElement) {
          animateScore(scoreElement, sectionData.score);
          scoreElement.className = `section-score ${getScoreClass(sectionData.score)}`;
        }
        
        if (feedbackElement) {
          feedbackElement.textContent = sectionData.feedback;
        }
        
        if (recommendationElement) {
          recommendationElement.textContent = sectionData.recommendation;
        }
      }
    }, index * 200);
  });
}

function updateRecommendations() {
  const recommendationsList = document.getElementById('recommendations-list');
  
  if (recommendationsList) {
    recommendationsList.innerHTML = '';
    
    mockAnalysisResults.recommendations.forEach((recommendation, index) => {
      setTimeout(() => {
        const li = document.createElement('li');
        li.textContent = recommendation;
        li.style.opacity = '0';
        li.style.transform = 'translateY(10px)';
        recommendationsList.appendChild(li);
        
        setTimeout(() => {
          li.style.transition = 'all 0.3s ease';
          li.style.opacity = '1';
          li.style.transform = 'translateY(0)';
        }, 50);
      }, index * 100);
    });
  }
}

function animateScore(element, targetScore) {
  let currentScore = 0;
  const increment = targetScore / 30;
  
  const animation = setInterval(() => {
    currentScore += increment;
    if (currentScore >= targetScore) {
      currentScore = targetScore;
      clearInterval(animation);
    }
    element.textContent = Math.round(currentScore);
  }, 50);
}

function getScoreClass(score) {
  if (score >= 80) return 'score-excellent';
  if (score >= 60) return 'score-good';
  return 'score-poor';
}

function downloadReport() {
  const reportContent = generateReportContent();
  
  const blob = new Blob([reportContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  a.href = url;
  a.download = `linkedin-profile-analysis-${new Date().toISOString().split('T')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  showNotification('📄 Report downloaded successfully!');
}

function generateReportContent() {
  const date = new Date().toLocaleDateString();
  let content = `LINKEDIN PROFILE ANALYSIS REPORT\n`;
  content += `Generated on: ${date}\n`;
  content += `Analysis Method: ${currentInputMode === 'image' ? 'Screenshot OCR' : 'Manual Text Input'}\n`;
  content += `Overall Score: ${mockAnalysisResults.overallScore}/100\n\n`;
  content += `═══════════════════════════════════════════════════\n\n`;
  
  // Section analysis
  Object.keys(mockAnalysisResults.sections).forEach(sectionName => {
    const section = mockAnalysisResults.sections[sectionName];
    content += `${sectionName.toUpperCase()} (Score: ${section.score}/100)\n`;
    content += `Feedback: ${section.feedback}\n`;
    content += `Recommendation: ${section.recommendation}\n\n`;
  });
  
  content += `═══════════════════════════════════════════════════\n\n`;
  content += `KEY RECOMMENDATIONS:\n`;
  mockAnalysisResults.recommendations.forEach((rec, index) => {
    content += `${index + 1}. ${rec}\n`;
  });
  
  content += `\n═══════════════════════════════════════════════════\n`;
  content += `Generated by ProfileAnalyzer - AI-Powered LinkedIn Profile Optimization\n`;
  content += `Now with Screenshot Analysis Feature!`;
  
  return content;
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 1000;
    font-size: 14px;
    font-weight: 500;
    max-width: 300px;
    word-wrap: break-word;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 4 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 4000);
}
