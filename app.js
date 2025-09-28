// SportsTalent AI - Complete Demo Application - FIXED VERSION
// Optimized for Entry-Level Smartphones with Full Feature Set

// Application State Management
const appState = {
  currentRole: null,
  currentLanguage: 'en',
  currentRegStep: 1,
  currentTab: 'home',
  currentOfficialTab: 'athletes',
  isRecording: false,
  isOnline: false,
  storageUsed: 145, // MB
  storageTotal: 2048, // MB (2GB)
  
  // Default athlete data (as per requirements)
  athlete: {
    name: 'demo_athlete',
    age: 15,
    state: 'Tamil Nadu', 
    district: 'Trichy',
    sport: 'Any',
    aadhaarLast4: '1234',
    overallScore: 87,
    testsCompleted: 8,
    testsTotal: 10,
    mobile: '9876543210',
    email: 'demo_athlete@gmail.com'
  },
  
  // Official data
  official: {
    name: 'Official Admin',
    organization: 'Sports Authority of India',
    region: 'Tamil Nadu',
    email: 'official@sai.gov.in'
  },
  
  // Performance data for charts (only for athletes)
  performanceData: {
    radar: [85, 78, 92, 88, 76, 94], // Speed, Strength, Endurance, Flexibility, Power, Agility
    progress: [65, 70, 75, 80, 85, 87] // Progress over time
  },
  
  // Chat responses in multiple languages
  chatResponses: {
    en: {
      recording: "📹 Recording Guide:\n• Position phone 2m away at chest height\n• Ensure good lighting, avoid shadows\n• Follow on-screen pose guide exactly\n• Keep phone steady (use stand if available)\n• AI will provide real-time feedback",
      storage: "💾 Smart Storage Management:\n• Videos auto-delete after cloud sync\n• Smart compression saves 60% space\n• Keep only essential data offline\n• Sync happens automatically with WiFi\n• Total app size under 200MB",
      offline: "📶 Offline Features:\n• Full AI analysis works without internet\n• All tests can be recorded offline\n• Data syncs when connection available\n• Pose detection runs on-device\n• Performance tracking continues offline",
      performance: "📊 Performance Insights:\n• Your overall score: 87/100 (Excellent)\n• Strengths: Speed & Power (90+ percentile)\n• Focus areas: Flexibility & Core strength\n• Improvement trend: +5 points this month\n• Elite potential: 94% confidence"
    },
    hi: {
      recording: "📹 रिकॉर्डिंग गाइड:\n• फोन को 2 मीटर दूर छाती की ऊंचाई पर रखें\n• अच्छी रोशनी सुनिश्चित करें, छाया से बचें\n• स्क्रीन पर दिए गए पोज़ गाइड का पालन करें\n• फोन को स्थिर रखें (स्टैंड का उपयोग करें)\n• AI रियल-टाइम फीडबैक देगा",
      storage: "💾 स्मार्ट स्टोरेज प्रबंधन:\n• क्लाउड सिंक के बाद वीडियो अपने आप डिलीट\n• स्मार्ट कम्प्रेशन से 60% स्थान बचाता है\n• केवल आवश्यक डेटा ऑफलाइन रखता है\n• WiFi से अपने आप सिंक होता है\n• कुल ऐप साइज़ 200MB से कम",
      offline: "📶 ऑफलाइन सुविधाएं:\n• इंटरनेट के बिना पूर्ण AI विश्लेषण\n• सभी टेस्ट ऑफलाइन रिकॉर्ड हो सकते हैं\n• कनेक्शन मिलने पर डेटा सिंक होता है\n• पोज़ डिटेक्शन डिवाइस पर चलता है\n• ऑफलाइन में भी प्रदर्शन ट्रैकिंग जारी रहती है",
      performance: "📊 प्रदर्शन अंतर्दृष्टि:\n• आपका समग्र स्कोर: 87/100 (उत्कृष्ट)\n• मजबूत पक्ष: गति और शक्ति (90+ प्रतिशतक)\n• सुधार क्षेत्र: लचीलापन और कोर स्ट्रेंथ\n• सुधार प्रवृत्ति: इस महीने +5 अंक\n• एलीट संभावना: 94% विश्वास"
    }
  }
};

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('🏆 SportsTalent AI - Complete Demo Starting...');
  initializeApplication();
});

// Main initialization function
function initializeApplication() {
  try {
    setupEventListeners();
    setupOTPInputs();
    setupFormValidation();
    simulateNetworkStatus();
    
    // Initialize welcome page
    showPage('welcome-page');
    
    console.log('✅ Application initialized successfully');
    console.log('📱 Optimized for entry-level smartphones');
    console.log('🌐 Multi-language support enabled');
    console.log('🤖 AI features ready');
    
  } catch (error) {
    console.error('❌ Initialization error:', error);
    showErrorMessage('Application failed to initialize. Please refresh the page.');
  }
}

// Event Listeners Setup
function setupEventListeners() {
  // Global click handler for navigation
  document.addEventListener('click', function(event) {
    // Handle bottom navigation clicks
    if (event.target.closest('.nav-btn')) {
      const navBtn = event.target.closest('.nav-btn');
      const tabName = navBtn.getAttribute('data-tab');
      if (tabName) {
        event.preventDefault();
        event.stopPropagation();
        switchTab(tabName);
        return;
      }
    }
    
    // Handle modal close buttons
    if (event.target.closest('.modal-close')) {
      event.preventDefault();
      const modal = event.target.closest('.modal');
      if (modal) {
        modal.classList.add('hidden');
      }
      return;
    }
    
    // Handle clicks outside modals to close them
    if (event.target.classList.contains('modal')) {
      event.target.classList.add('hidden');
    }
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', function(event) {
    // Escape key to close modals
    if (event.key === 'Escape') {
      closeAllModals();
      return;
    }
  });
  
  // Chat input enter key
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
      }
    });
  }
  
  // Form submissions
  document.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submission intercepted for demo');
  });
  
  console.log('📡 Event listeners configured');
}

// Navigation Functions
function showPage(pageId) {
  try {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      console.log('📄 Navigated to:', pageId);
      
      // Special handling for athlete dashboard - CRITICAL FIX
      if (pageId === 'athlete-dashboard') {
        setTimeout(() => {
          // Ensure bottom nav is visible and working
          const bottomNav = document.querySelector('.bottom-nav');
          if (bottomNav) {
            bottomNav.style.display = 'flex';
            bottomNav.style.position = 'fixed';
            bottomNav.style.bottom = '0';
            bottomNav.style.left = '0';
            bottomNav.style.right = '0';
            bottomNav.style.zIndex = '200';
          }
          
          // Initialize with home tab
          if (appState.currentTab) {
            switchTab(appState.currentTab);
          } else {
            switchTab('home');
          }
        }, 100);
      }
      
      // Update role indicator if on login/registration page
      if (pageId === 'login-page' || pageId === 'registration-page') {
        updateRoleIndicator();
      }
      
    } else {
      console.error('❌ Page not found:', pageId);
    }
  } catch (error) {
    console.error('❌ Navigation error:', error);
  }
}

// Role and Page Navigation
function showWelcomePage() {
  showPage('welcome-page');
  appState.currentRole = null;
  console.log('🏠 Returned to welcome page');
}

function selectRole(role) {
  appState.currentRole = role;
  console.log('👤 Selected role:', role);
  showLoginPage();
}

function showLoginPage() {
  showPage('login-page');
  updateLoginPage();
  console.log('🔑 Showing login page');
}

function updateLoginPage() {
  const athleteLogin = document.getElementById('athlete-login');
  const officialLogin = document.getElementById('official-login');
  
  if (appState.currentRole === 'athlete') {
    if (athleteLogin) athleteLogin.classList.add('active');
    if (officialLogin) officialLogin.classList.remove('active');
  } else {
    if (athleteLogin) athleteLogin.classList.remove('active');
    if (officialLogin) officialLogin.classList.add('active');
  }
}

function showUidaiTutorial() {
  showPage('uidai-tutorial-page');
  console.log('📚 Showing UIDAI tutorial');
}

function showRecordingTutorial() {
  showPage('recording-tutorial-page');
  console.log('🎥 Showing recording tutorial');
}

function showRegistrationPage() {
  showPage('registration-page');
  resetRegistration();
  console.log('📝 Starting registration process');
}

function startPracticeMode() {
  showInfoModal(
    '🎯 Practice Recording Mode',
    `<div class="practice-mode">
      <h4>🎬 Interactive Practice Session</h4>
      <p>Practice mode helps you achieve 95%+ setup quality scores for optimal AI analysis!</p>
      <div class="practice-benefits">
        <h5>✨ Practice Mode Benefits:</h5>
        <ul>
          <li>🎯 No data usage - completely offline</li>
          <li>🔄 Unlimited attempts to perfect your setup</li>
          <li>🤖 Real-time AI feedback and guidance</li>
          <li>📊 Setup quality scoring and tips</li>
        </ul>
      </div>
    </div>`
  );
}

// Login Functions - FIXED
function switchLoginMethod(method) {
  const usernameLogin = document.getElementById('username-login');
  const mobileLogin = document.getElementById('mobile-login');
  const methodBtns = document.querySelectorAll('.method-btn');
  
  // Update button states
  methodBtns.forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase().includes(method));
  });
  
  // Update login method visibility
  if (usernameLogin && mobileLogin) {
    if (method === 'username') {
      usernameLogin.classList.add('active');
      mobileLogin.classList.remove('active');
    } else {
      usernameLogin.classList.remove('active');
      mobileLogin.classList.add('active');
    }
  }
  
  console.log('🔄 Switched to login method:', method);
}

function sendOTPToMobile() {
  const mobile = document.getElementById('athlete-mobile').value;
  if (!mobile) {
    showErrorMessage('Please enter your mobile number');
    return;
  }
  
  // Show OTP section
  const otpSection = document.getElementById('otp-section');
  if (otpSection) {
    otpSection.classList.remove('hidden');
  }
  
  // Auto-fill demo OTP
  setTimeout(() => {
    const otpBoxes = document.querySelectorAll('#otp-section .otp-box');
    '0000'.split('').forEach((digit, index) => {
      if (otpBoxes[index]) {
        otpBoxes[index].value = digit;
      }
    });
    showInfoMessage('📱 Demo OTP auto-filled: 0000');
  }, 1500);
  
  showInfoMessage('📱 OTP sent to ' + mobile);
  
  // Update button
  const sendBtn = document.getElementById('send-otp-btn');
  if (sendBtn) {
    sendBtn.textContent = 'Resend OTP';
    sendBtn.classList.remove('btn--secondary');
    sendBtn.classList.add('btn--outline');
  }
}

function loginAthlete(method) {
  let isValid = false;
  
  if (method === 'username') {
    const username = document.getElementById('athlete-username').value;
    const password = document.getElementById('athlete-password').value;
    
    if (username === 'demo_athlete' && password === '1234') {
      isValid = true;
    } else {
      showErrorMessage('Invalid username or password. Use: demo_athlete / 1234');
      return;
    }
  } else if (method === 'mobile') {
    const otpBoxes = document.querySelectorAll('#otp-section .otp-box');
    const otp = Array.from(otpBoxes).map(box => box.value).join('');
    
    if (otp === '0000') {
      isValid = true;
    } else {
      showErrorMessage('Invalid OTP. Demo OTP is: 0000');
      return;
    }
  }
  
  if (isValid) {
    console.log('✅ Athlete login successful');
    showInfoMessage('🎉 Login successful! Welcome ' + appState.athlete.name);
    setTimeout(() => {
      showPage('athlete-dashboard');
      // Force bottom navigation to be visible and working
      setTimeout(() => {
        ensureBottomNavigation();
        switchTab('home');
      }, 200);
    }, 1000);
  }
}

// FIXED: Official login function
function loginOfficial() {
  const username = document.getElementById('official-username').value;
  const password = document.getElementById('official-password').value;
  
  // Clear any input artifacts
  const cleanUsername = username.trim();
  const cleanPassword = password.trim();
  
  console.log('Debug - Username:', cleanUsername, 'Password:', cleanPassword);
  
  if (cleanUsername === 'official_admin' && cleanPassword === 'admin') {
    console.log('✅ Official login successful');
    showInfoMessage('🎉 Login successful! Welcome Official Admin');
    setTimeout(() => {
      showPage('official-dashboard');
      switchOfficialTab('athletes');
    }, 1000);
  } else {
    showErrorMessage('Invalid username or password. Use: official_admin / admin');
    console.log('❌ Login failed. Expected: official_admin/admin, Got:', cleanUsername + '/' + cleanPassword);
  }
}

// CRITICAL FIX: Bottom Navigation
function ensureBottomNavigation() {
  const bottomNav = document.querySelector('.bottom-nav');
  if (!bottomNav) {
    console.error('❌ Bottom navigation not found');
    return;
  }
  
  // Force proper styles and visibility
  bottomNav.style.cssText = `
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    z-index: 200 !important;
    display: flex !important;
    visibility: visible !important;
    background: var(--color-surface) !important;
    border-top: 1px solid var(--color-border) !important;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1) !important;
  `;
  
  // Ensure all nav buttons work
  const navButtons = bottomNav.querySelectorAll('.nav-btn');
  navButtons.forEach((btn, index) => {
    const tabs = ['home', 'record', 'performance', 'help', 'profile'];
    btn.setAttribute('data-tab', tabs[index]);
    
    // Remove existing event listeners and add new ones
    btn.replaceWith(btn.cloneNode(true));
  });
  
  // Re-attach event listeners to the new buttons
  bottomNav.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const tabName = this.getAttribute('data-tab');
      if (tabName) {
        switchTab(tabName);
      }
    });
  });
  
  console.log('🧭 Bottom navigation fixed and enabled');
}

// CRITICAL FIX: Tab switching
function switchTab(tabName) {
  try {
    console.log('🔄 Switching to tab:', tabName);
    
    // Ensure we're on athlete dashboard
    const athleteDashboard = document.getElementById('athlete-dashboard');
    if (!athleteDashboard?.classList.contains('active')) {
      console.log('Dashboard not active, switching to dashboard first');
      showPage('athlete-dashboard');
      setTimeout(() => switchTab(tabName), 300);
      return;
    }
    
    // Update bottom nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      const btnTab = btn.getAttribute('data-tab');
      btn.classList.toggle('active', btnTab === tabName);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-pane').forEach(pane => {
      const isActive = pane.id === `${tabName}-tab`;
      pane.classList.toggle('active', isActive);
      pane.style.display = isActive ? 'block' : 'none';
    });
    
    appState.currentTab = tabName;
    
    // Initialize tab-specific features
    setTimeout(() => {
      if (tabName === 'performance') {
        initializePerformanceCharts();
      } else if (tabName === 'help') {
        initializeChatbot();
      }
    }, 100);
    
    console.log('✅ Successfully switched to tab:', tabName);
    
  } catch (error) {
    console.error('❌ Tab switching error:', error);
  }
}

// Official Dashboard Navigation - FIXED
function switchOfficialTab(tabName) {
  try {
    console.log('🔄 Switching to official tab:', tabName);
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const btnText = btn.textContent.toLowerCase();
      const isActive = btnText.includes(tabName) || 
                      (tabName === 'help' && btnText.includes('help')) ||
                      (tabName === 'profile' && btnText.includes('profile')) ||
                      (tabName === 'athletes' && btnText.includes('athletes')) ||
                      (tabName === 'approvals' && btnText.includes('approvals'));
      btn.classList.toggle('active', isActive);
    });
    
    // Update tab content
    document.querySelectorAll('.official-content').forEach(content => {
      const isActive = content.id === `${tabName}-tab` || 
                      (content.id === 'help-official-tab' && tabName === 'help') ||
                      (content.id === 'profile-official-tab' && tabName === 'profile');
      content.classList.toggle('active', isActive);
    });
    
    appState.currentOfficialTab = tabName;
    console.log('✅ Official tab switched to:', tabName);
    
  } catch (error) {
    console.error('❌ Official tab switching error:', error);
  }
}

// Test Recording Functions - FIXED
function openTestModal(testName, category = '') {
  try {
    const modal = document.getElementById('test-modal');
    const title = document.getElementById('test-title');
    
    if (!modal || !title) {
      console.error('❌ Test modal elements not found');
      return;
    }
    
    title.textContent = `${testName} Recording`;
    modal.classList.remove('hidden');
    
    // Reset checklist
    resetRecordingChecklist();
    
    // Update pose instruction based on test
    const instruction = document.getElementById('pose-instruction');
    if (instruction) {
      instruction.textContent = `Position yourself for ${testName} test`;
    }
    
    console.log('📹 Opened test modal for:', testName);
    
  } catch (error) {
    console.error('❌ Error opening test modal:', error);
  }
}

function resetRecordingChecklist() {
  document.querySelectorAll('#setup-checklist input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });
  updateReadiness();
}

function updateReadiness() {
  const checkboxes = document.querySelectorAll('#setup-checklist input[type="checkbox"]');
  const checkedCount = document.querySelectorAll('#setup-checklist input[type="checkbox"]:checked').length;
  const recordBtn = document.getElementById('record-btn');
  
  if (!recordBtn) return;
  
  const isReady = checkedCount === checkboxes.length;
  
  recordBtn.disabled = !isReady;
  
  if (isReady) {
    recordBtn.innerHTML = `
      <span class="btn-content">
        <span class="btn-icon">🔴</span>
        <span class="btn-text">Start Recording</span>
      </span>
    `;
    recordBtn.classList.remove('btn--outline');
    recordBtn.classList.add('btn--primary');
  } else {
    recordBtn.innerHTML = `
      <span class="btn-content">
        <span class="btn-icon">⏸️</span>
        <span class="btn-text">Complete Setup (${checkedCount}/${checkboxes.length})</span>
      </span>
    `;
  }
}

function startRecording() {
  if (appState.isRecording) return;
  
  try {
    appState.isRecording = true;
    const recordBtn = document.getElementById('record-btn');
    
    // Recording sequence
    recordBtn.innerHTML = '<span class="btn-content"><span class="btn-icon">🔴</span><span class="btn-text">Recording...</span></span>';
    recordBtn.disabled = true;
    
    // Simulate recording progress
    setTimeout(() => {
      recordBtn.innerHTML = '<span class="btn-content"><span class="btn-icon">⚙️</span><span class="btn-text">AI Processing...</span></span>';
      
      setTimeout(() => {
        appState.isRecording = false;
        closeTestModal();
        showRecordingResults();
      }, 2000);
    }, 3000);
    
    console.log('🎬 Recording started');
    
  } catch (error) {
    console.error('❌ Recording error:', error);
    appState.isRecording = false;
  }
}

function showRecordingResults() {
  const testTitle = document.getElementById('test-title')?.textContent || 'Fitness Test';
  
  showInfoModal(
    '🎉 Recording Complete!',
    `<div class="recording-results">
      <h4>✅ ${testTitle} - Successfully Recorded</h4>
      
      <div class="ai-analysis">
        <h5>🤖 AI Analysis Results:</h5>
        <div class="analysis-grid">
          <div class="analysis-item">
            <span class="analysis-label">Form Score:</span>
            <span class="analysis-value">94/100</span>
          </div>
          <div class="analysis-item">
            <span class="analysis-label">Technique:</span>
            <span class="analysis-value">Excellent</span>
          </div>
        </div>
      </div>
      
      <div class="storage-info">
        <h5>💾 Storage Management:</h5>
        <p>📁 File size: 25MB (compressed from 62MB)</p>
        <p>☁️ Will auto-sync when WiFi available</p>
        <p>🗑️ Auto-delete after successful upload</p>
      </div>
    </div>`
  );
  
  console.log('📊 Recording results displayed');
}

function closeTestModal() {
  const modal = document.getElementById('test-modal');
  if (modal) {
    modal.classList.add('hidden');
    appState.isRecording = false;
    console.log('❌ Test modal closed');
  }
}

// Performance Charts (Only for Athletes)
function initializePerformanceCharts() {
  if (appState.currentRole !== 'athlete') {
    console.log('⚠️ Charts disabled for officials');
    return;
  }
  
  initPerformanceRadarChart();
  initProgressLineChart();
  console.log('📊 Performance charts initialized');
}

function initPerformanceRadarChart() {
  const ctx = document.getElementById('performance-chart');
  if (!ctx || ctx.chartInstance) return;
  
  try {
    const chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Speed', 'Strength', 'Endurance', 'Flexibility', 'Power', 'Agility'],
        datasets: [{
          label: 'Current Performance',
          data: appState.performanceData.radar,
          backgroundColor: 'rgba(31, 184, 205, 0.2)',
          borderColor: '#1FB8CD',
          borderWidth: 2,
          pointBackgroundColor: '#1FB8CD',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(119, 124, 124, 0.2)' },
            ticks: { 
              color: 'var(--color-text-secondary)',
              stepSize: 20,
              callback: function(value) { return value + '%'; }
            },
            pointLabels: {
              color: 'var(--color-text)',
              font: { size: 11, weight: '500' }
            }
          }
        }
      }
    });
    ctx.chartInstance = chart;
    console.log('📈 Radar chart created');
  } catch (error) {
    console.error('❌ Radar chart error:', error);
  }
}

function initProgressLineChart() {
  const ctx = document.getElementById('progress-chart');
  if (!ctx || ctx.chartInstance) return;
  
  try {
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Overall Score',
          data: appState.performanceData.progress,
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          borderColor: '#1FB8CD',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#1FB8CD',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(119, 124, 124, 0.2)' },
            ticks: { 
              color: 'var(--color-text-secondary)',
              callback: function(value) { return value + '%'; }
            }
          },
          x: {
            grid: { display: false },
            ticks: { color: 'var(--color-text-secondary)' }
          }
        }
      }
    });
    ctx.chartInstance = chart;
    console.log('📊 Progress chart created');
  } catch (error) {
    console.error('❌ Progress chart error:', error);
  }
}

// Chatbot Functions - FIXED
function initializeChatbot() {
  const chatMessages = document.getElementById('chat-messages');
  if (chatMessages && chatMessages.children.length <= 1) {
    // Add welcome message if not already present
    addBotMessage(
      appState.currentLanguage === 'en' ? 
      "Hi! I'm your AI assistant. I can help with recording, storage, offline features, and performance tracking. Ask me anything!" :
      "नमस्ते! मैं आपका AI असिस्टेंट हूं। मैं रिकॉर्डिंग, स्टोरेज, ऑफलाइन सुविधाओं और प्रदर्शन ट्रैकिंग में मदद कर सकता हूं। कुछ भी पूछें!"
    );
  }
}

function toggleLanguage() {
  appState.currentLanguage = appState.currentLanguage === 'en' ? 'hi' : 'en';
  
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.innerHTML = appState.currentLanguage === 'en' ? '🌐 हिंदी' : '🌐 English';
  }
  
  addBotMessage(
    appState.currentLanguage === 'en' ? 
    'Language switched to English. How can I help you?' :
    'भाषा हिंदी में बदल दी गई है। मैं आपकी कैसे मदद कर सकता हूं?'
  );
  
  console.log('🌐 Language switched to:', appState.currentLanguage);
}

function clearChat() {
  const chatMessages = document.getElementById('chat-messages');
  if (chatMessages) {
    chatMessages.innerHTML = '';
    initializeChatbot();
  }
}

function askQuestion(topic, buttonElement) {
  // Update active button
  if (buttonElement) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');
  }
  
  const response = appState.chatResponses[appState.currentLanguage][topic];
  if (response) {
    addBotMessage(response);
  }
  
  console.log('❓ Asked question about:', topic);
}

function askQuickQuestion(question) {
  addUserMessage(question);
  
  setTimeout(() => {
    const responses = {
      'How do I record a test?': appState.chatResponses[appState.currentLanguage].recording,
      'How does offline mode work?': appState.chatResponses[appState.currentLanguage].offline
    };
    
    const response = responses[question] || appState.chatResponses[appState.currentLanguage].recording;
    addBotMessage(response);
  }, 800);
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim()) return;
  
  const message = input.value.trim();
  addUserMessage(message);
  input.value = '';
  
  // Generate contextual AI response
  setTimeout(() => {
    const response = generateAIResponse(message);
    addBotMessage(response);
  }, 1000);
}

function generateAIResponse(message) {
  const lowerMessage = message.toLowerCase();
  const lang = appState.currentLanguage;
  
  // Smart response generation based on keywords
  if (lowerMessage.includes('record') || lowerMessage.includes('रिकॉर्ड')) {
    return appState.chatResponses[lang].recording;
  } else if (lowerMessage.includes('storage') || lowerMessage.includes('स्टोरेज')) {
    return appState.chatResponses[lang].storage;
  } else if (lowerMessage.includes('offline') || lowerMessage.includes('ऑफलाइन')) {
    return appState.chatResponses[lang].offline;
  } else if (lowerMessage.includes('score') || lowerMessage.includes('performance') || lowerMessage.includes('स्कोर')) {
    return appState.chatResponses[lang].performance;
  } else {
    // General helpful responses
    const generalResponses = lang === 'en' ? [
      '🤖 I understand your question. For the best experience, try using the recording guides and ensure good lighting conditions.',
      '💡 Great question! The app is designed to work smoothly on entry-level phones with offline AI capabilities.',
      '📱 For optimal results, follow the setup checklist before recording any fitness tests.',
      '🏆 Your progress looks excellent! Keep consistent training and use the AI recommendations.'
    ] : [
      '🤖 मैं आपका प्रश्न समझ गया हूं। बेहतर अनुभव के लिए रिकॉर्डिंग गाइड का उपयोग करें और अच्छी रोशनी सुनिश्चित करें।',
      '💡 बहुत अच्छा सवाल! यह ऐप एंट्री-लेवल फोन पर ऑफलाइन AI के साथ सुचारू रूप से काम करने के लिए डिज़ाइन किया गया है।',
      '📱 सर्वोत्तम परिणामों के लिए, कोई भी फिटनेस टेस्ट रिकॉर्ड करने से पहले सेटअप चेकलिस्ट का पालन करें।',
      '🏆 आपकी प्रगति उत्कृष्ट लग रही है! निरंतर प्रशिक्षण जारी रखें और AI सुझावों का उपयोग करें।'
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }
}

function addUserMessage(message) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;
  
  const messageEl = document.createElement('div');
  messageEl.className = 'bot-message user-message';
  messageEl.innerHTML = `
    <div class="message-content" style="margin-left: auto; max-width: 80%;">
      <div class="message-text" style="background: var(--color-primary); color: var(--color-btn-primary-text);">
        <p>${message}</p>
      </div>
    </div>
    <div class="bot-avatar" style="background: var(--color-primary); color: var(--color-btn-primary-text);">👤</div>
  `;
  
  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(message) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;
  
  const messageEl = document.createElement('div');
  messageEl.className = 'bot-message';
  messageEl.innerHTML = `
    <div class="bot-avatar">🤖</div>
    <div class="message-content">
      <div class="message-text">
        <p style="white-space: pre-line;">${message}</p>
      </div>
    </div>
  `;
  
  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Profile Management - FIXED
function toggleProfileEdit() {
  const inputs = document.querySelectorAll('.profile-input');
  const actions = document.getElementById('profile-actions');
  const editBtn = document.getElementById('edit-profile-btn');
  
  const isEditing = !inputs[0].readOnly;
  
  inputs.forEach(input => {
    input.readOnly = isEditing;
    input.disabled = isEditing;
  });
  
  if (actions) {
    actions.classList.toggle('hidden', isEditing);
  }
  
  if (editBtn) {
    editBtn.innerHTML = isEditing ? '✏️ Edit' : '❌ Cancel';
  }
  
  console.log('Profile editing:', !isEditing ? 'enabled' : 'disabled');
}

function saveProfile() {
  const nameInput = document.getElementById('profile-name');
  const ageInput = document.getElementById('profile-age');
  const stateInput = document.getElementById('profile-state');
  const districtInput = document.getElementById('profile-district');
  const sportInput = document.getElementById('profile-sport');
  const mobileInput = document.getElementById('profile-mobile');
  const emailInput = document.getElementById('profile-email');
  
  // Save to app state
  if (nameInput) appState.athlete.name = nameInput.value;
  if (ageInput) appState.athlete.age = parseInt(ageInput.value);
  if (stateInput) appState.athlete.state = stateInput.value;
  if (districtInput) appState.athlete.district = districtInput.value;
  if (sportInput) appState.athlete.sport = sportInput.options[sportInput.selectedIndex].text;
  if (mobileInput) appState.athlete.mobile = mobileInput.value;
  if (emailInput) appState.athlete.email = emailInput.value;
  
  showInfoMessage('✅ Profile saved successfully!');
  
  // Exit edit mode
  cancelProfileEdit();
  
  console.log('💾 Profile saved:', appState.athlete);
}

function cancelProfileEdit() {
  // Reset inputs to original values
  const nameInput = document.getElementById('profile-name');
  const ageInput = document.getElementById('profile-age');
  const stateInput = document.getElementById('profile-state');
  const districtInput = document.getElementById('profile-district');
  const sportInput = document.getElementById('profile-sport');
  const mobileInput = document.getElementById('profile-mobile');
  const emailInput = document.getElementById('profile-email');
  
  if (nameInput) nameInput.value = appState.athlete.name;
  if (ageInput) ageInput.value = appState.athlete.age;
  if (stateInput) stateInput.value = appState.athlete.state;
  if (districtInput) districtInput.value = appState.athlete.district;
  if (mobileInput) mobileInput.value = appState.athlete.mobile;
  if (emailInput) emailInput.value = appState.athlete.email;
  
  // Exit edit mode
  toggleProfileEdit();
}

// Official Dashboard Functions (No analytics/graphs for officials)
function viewAthleteProfile(athleteId) {
  showInfoModal(
    '👤 Athlete Profile - ' + athleteId,
    `<div class="athlete-profile">
      <div class="profile-header">
        <div class="profile-pic">👤</div>
        <div class="profile-info">
          <h4>${appState.athlete.name}</h4>
          <p>${appState.athlete.age} years • ${appState.athlete.district}, ${appState.athlete.state}</p>
          <p>Sport: ${appState.athlete.sport}</p>
          <p>Overall Score: ${appState.athlete.overallScore}/100</p>
        </div>
      </div>
      
      <div class="athlete-stats">
        <h5>Basic Information:</h5>
        <ul>
          <li>Tests Completed: ${appState.athlete.testsCompleted}/${appState.athlete.testsTotal}</li>
          <li>Registration Date: September 2024</li>
          <li>Last Active: Today</li>
          <li>Aadhaar Status: Verified (****${appState.athlete.aadhaarLast4})</li>
        </ul>
      </div>
      
      <div class="note">
        <p><strong>Note:</strong> Officials can view athlete profiles but not performance analytics graphs for privacy.</p>
      </div>
    </div>`
  );
  
  console.log('👤 Viewing athlete profile:', athleteId);
}

function approveAthlete(athleteId) {
  showInfoModal(
    '✅ Approve Athlete',
    `<div class="approval-confirmation">
      <h4>Approve ${athleteId} for Training Program?</h4>
      <p>This will recommend the athlete for state-level training programs.</p>
      <div class="approval-actions" style="display: flex; gap: 12px; margin-top: 16px;">
        <button class="btn btn--primary" onclick="confirmApproval('${athleteId}')">✅ Confirm Approval</button>
        <button class="btn btn--outline" onclick="closeAllModals()">❌ Cancel</button>
      </div>
    </div>`
  );
}

function confirmApproval(athleteId) {
  showInfoMessage(`🎉 ${athleteId} has been approved for state training programs!`);
  closeAllModals();
  console.log('✅ Athlete approved:', athleteId);
}

// Registration Functions
function resetRegistration() {
  appState.currentRegStep = 1;
  document.querySelectorAll('.reg-step').forEach((step, index) => {
    step.classList.toggle('active', index === 0);
  });
  
  // Clear inputs
  document.querySelectorAll('.reg-form input').forEach(input => {
    if (!input.readOnly) input.value = '';
  });
  
  console.log('🔄 Registration reset to step 1');
}

function updateRoleIndicator() {
  const indicators = document.querySelectorAll('.role-indicator, #login-role-indicator');
  indicators.forEach(indicator => {
    if (appState.currentRole) {
      const roleText = appState.currentRole === 'athlete' ? 'Athlete' : 'Official';
      const pageText = window.location.hash === '#login' ? ' Login' : ' Registration';
      indicator.textContent = roleText + pageText;
    }
  });
}

function nextRegStep() {
  const currentStep = document.getElementById(`reg-step-${appState.currentRegStep}`);
  if (currentStep) currentStep.classList.remove('active');
  
  appState.currentRegStep++;
  const nextStep = document.getElementById(`reg-step-${appState.currentRegStep}`);
  if (nextStep) nextStep.classList.add('active');
  
  console.log('➡️ Advanced to registration step:', appState.currentRegStep);
  
  // Auto-fill demo data
  if (appState.currentRegStep === 2) {
    simulateOTPDelivery();
  } else if (appState.currentRegStep === 3) {
    populateProfileData();
  }
}

function simulateOTPDelivery() {
  showInfoMessage('📱 OTP sent to your registered mobile number ending in **10');
  
  // Auto-fill OTP after delay for demo
  setTimeout(() => {
    const otpBoxes = document.querySelectorAll('.reg-step .otp-box');
    '123456'.split('').forEach((digit, index) => {
      if (otpBoxes[index]) {
        setTimeout(() => {
          otpBoxes[index].value = digit;
          if (index === 5) {
            showInfoMessage('✅ OTP auto-filled for demo: 123456');
          }
        }, index * 300);
      }
    });
  }, 1500);
}

function populateProfileData() {
  const sportSelect = document.getElementById('sport-select');
  if (sportSelect) {
    sportSelect.value = 'any';
  }
  
  showInfoMessage('✅ Profile data retrieved from UIDAI successfully');
}

function resendOTP() {
  showInfoMessage('📱 New OTP sent to your registered mobile number');
  console.log('🔄 OTP resent (demo)');
}

function completeRegistration() {
  // Validate consent
  const consentData = document.getElementById('consent-data');
  const consentTerms = document.getElementById('consent-terms');
  
  if (!consentData?.checked || !consentTerms?.checked) {
    showErrorMessage('Please agree to both consent items to continue');
    return;
  }
  
  console.log('🎉 Registration completed for:', appState.currentRole);
  
  // Navigate to appropriate dashboard
  if (appState.currentRole === 'athlete') {
    setTimeout(() => {
      showPage('athlete-dashboard');
      setTimeout(() => {
        ensureBottomNavigation();
        switchTab('home');
        showWelcomeMessage();
      }, 300);
    }, 500);
  } else {
    showPage('official-dashboard');
    switchOfficialTab('athletes');
    showInfoMessage('👨‍💼 Welcome to the Official Dashboard!');
  }
}

function showWelcomeMessage() {
  setTimeout(() => {
    showInfoModal(
      '🎉 Welcome to SportsTalent AI!',
      `<div class="welcome-content">
        <h4>Your Journey Starts Now</h4>
        <p>You're registered as: <strong>${appState.athlete.name}</strong></p>
        <p>Age: <strong>${appState.athlete.age}</strong></p>
        <p>Location: <strong>${appState.athlete.district}, ${appState.athlete.state}</strong></p>
        <p>Sport: <strong>${appState.athlete.sport}</strong></p>
        
        <div class="next-steps">
          <h5>🎯 Next Steps:</h5>
          <ol>
            <li>Record your first fitness test</li>
            <li>Get AI-powered performance analysis</li>
            <li>Track your progress over time</li>
            <li>Achieve your athletic potential</li>
          </ol>
        </div>
        
        <div class="navigation-tip">
          <h5>📱 Navigation Tip:</h5>
          <p>Use the bottom tabs: Home 🏠 • Record 📹 • Performance 📊 • Help 💬 • Profile 👤</p>
        </div>
      </div>`
    );
  }, 1000);
}

// OTP Input Handling
function setupOTPInputs() {
  const otpBoxes = document.querySelectorAll('.otp-box');
  otpBoxes.forEach((box, index) => {
    box.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && index < otpBoxes.length - 1) {
        otpBoxes[index + 1].focus();
      }
    });
    
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
        otpBoxes[index - 1].focus();
      }
    });
  });
}

// Form Validation
function setupFormValidation() {
  // Aadhaar input validation
  const aadhaarInput = document.getElementById('aadhaar-input');
  if (aadhaarInput) {
    aadhaarInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    });
  }
}

// Network Status Simulation
function simulateNetworkStatus() {
  appState.isOnline = Math.random() > 0.3; // 70% chance of being offline
  
  const statusElement = document.querySelector('.status.offline');
  if (statusElement) {
    if (appState.isOnline) {
      statusElement.textContent = '📶 Online';
      statusElement.style.color = 'var(--color-primary)';
    } else {
      statusElement.textContent = '📶 Offline Mode';
    }
  }
  
  console.log('📡 Network status:', appState.isOnline ? 'Online' : 'Offline');
}

// Utility Functions
function showInfoMessage(message) {
  console.log('ℹ️', message);
  
  // Create temporary notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-success);
    color: var(--color-btn-primary-text);
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 1001;
    font-size: 14px;
    box-shadow: var(--shadow-md);
    max-width: 90vw;
    text-align: center;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function showErrorMessage(message) {
  console.error('❌', message);
  
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-error);
    color: var(--color-btn-primary-text);
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 1001;
    font-size: 14px;
    box-shadow: var(--shadow-md);
    max-width: 90vw;
    text-align: center;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

function showInfoModal(title, content) {
  // Create modal dynamically
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
    </div>
  `;
  
  // Allow clicking outside to close
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  };
  
  document.body.appendChild(modal);
  
  // Auto-remove after 15 seconds for demo
  setTimeout(() => {
    if (modal.parentNode) {
      modal.remove();
    }
  }, 15000);
}

function closeAllModals() {
  // Close built-in modals
  document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
    modal.classList.add('hidden');
  });
  
  // Remove dynamic modals
  document.querySelectorAll('.modal:not([id])').forEach(modal => {
    modal.remove();
  });
  
  console.log('🔒 All modals closed');
}

// Initialize everything when page loads
window.addEventListener('load', function() {
  setTimeout(() => {
    ensureBottomNavigation();
    simulateNetworkStatus();
    
    console.log('🚀 SportsTalent AI - Fully Loaded & Ready!');
    console.log('✅ All features operational');
    console.log('🧭 Bottom navigation: FIXED');
    console.log('📱 Entry-level phone optimizations: Active');
    console.log('🤖 AI capabilities: Ready');
    console.log('🌐 Multi-language support: Enabled');
    console.log('📊 Performance tracking: Ready (Athletes only)');
    console.log('💬 AI Chatbot: Working');
    console.log('👤 Profile management: Working');
    console.log('🔐 UIDAI authentication: Simulated');
    
  }, 500);
});

// Export for debugging
window.appState = appState;
window.appFunctions = {
  switchTab,
  selectRole,
  showPage,
  ensureBottomNavigation,
  toggleLanguage,
  startRecording,
  toggleProfileEdit,
  closeAllModals,
  loginAthlete,
  loginOfficial
};

console.log('🏆 SportsTalent AI - FIXED VERSION Ready!');
console.log('🎯 Features: Login ✅ Registration ✅ Recording ✅ Performance ✅ AI Chat ✅ Profile ✅');
console.log('🧭 Navigation: FIXED - Bottom tabs working properly!');
console.log('📱 Optimized for 2GB RAM smartphones with full offline capability!');