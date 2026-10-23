const labs = [
  {
    id: "lab1",
    number: "01",
    title: "Image fundamentals",
    short: "Images / pixels",
    kind: "interactive",
    kindLabel: "Browser interactive",
    weeks: "1—2",
    method: "Image representation",
    objective: "Familiarize yourself with computer vision fundamentals, digital image representation, and basic image manipulation using OpenCV concepts.",
    concepts: ["pixels", "BGR channels", "grayscale", "ROI", "resize", "rotation"],
    checklist: ["Load and inspect a color image", "Convert color to grayscale", "Read and change a pixel", "Crop, resize, and rotate", "Capture original and manipulated outputs"],
    steps: ["Load an image and inspect its height, width, and channel count.", "Compare the color image with its grayscale representation.", "Inspect a pixel coordinate and apply a visible pixel change.", "Create a region of interest, resize it, and rotate the image by 90 degrees."],
    questions: ["How are images digitally represented?", "Why do color channels and pixel values matter?", "Which real-life systems use image manipulation?"],
    source: "CSST106_Lab_Experiment_01_Images.docx",
    benchTitle: "Image manipulation bench",
    benchDescription: "Start with a supplied image or use the built-in reference board. Every transformation is rendered locally in this browser.",
    code: "const image = cv2.imread('input.jpg');\ngray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)\nroi = image[y1:y2, x1:x2]\nrotated = cv2.rotate(image, cv2.ROTATE_90_CLOCKWISE)",
  },
  {
    id: "lab2",
    number: "02",
    title: "Edge detection",
    short: "Sobel / Canny",
    kind: "interactive",
    kindLabel: "Browser interactive",
    weeks: "3—4",
    method: "Gradient + thresholding",
    objective: "Implement Sobel and Canny edge detection, compare their edge maps, and understand how preprocessing changes the result.",
    concepts: ["Gaussian blur", "Sobel X/Y", "gradient magnitude", "Canny", "thresholds"],
    checklist: ["Convert the input to grayscale", "Reduce noise before detection", "Compare Sobel and Canny maps", "Explain threshold sensitivity", "Save a side-by-side result"],
    steps: ["Read the input in grayscale and apply a small blur to reduce noise.", "Compute horizontal and vertical Sobel gradients, then combine their magnitude.", "Apply a Canny-style double-threshold view and compare the result with Sobel.", "Discuss why Canny produces a thinner, more selective edge map."],
    questions: ["How do Sobel and Canny differ?", "Why is blurring useful before edge detection?", "Where would edge maps support object detection or segmentation?"],
    source: "CSST106_Lab_Experiment_02_Edge_Detection..docx",
    benchTitle: "Gradient comparison bench",
    benchDescription: "Tune the high threshold and inspect how a grayscale image becomes a structural map.",
    code: "img = cv2.imread('input.jpg', cv2.IMREAD_GRAYSCALE)\nimg_blur = cv2.GaussianBlur(img, (3, 3), 0)\nsobelx = cv2.Sobel(img_blur, cv2.CV_64F, 1, 0, ksize=3)\nedges = cv2.Canny(img_blur, 100, 200)",
  },
  {
    id: "lab3",
    number: "03",
    title: "Histogram & contrast",
    short: "Equalization",
    kind: "interactive",
    kindLabel: "Browser interactive",
    weeks: "4—5",
    method: "Intensity redistribution",
    objective: "Use histogram equalization, contrast stretching, and adaptive local contrast to improve the visibility of image detail.",
    concepts: ["histogram", "equalizeHist", "CLAHE", "luminance", "contrast"],
    checklist: ["Inspect the original intensity distribution", "Apply global equalization", "Apply contrast stretching", "Compare a CLAHE-inspired local result", "Note noise or artifact amplification"],
    steps: ["Load a grayscale or color image and use its luminance for analysis.", "Plot the histogram before processing, then redistribute intensity values globally.", "Stretch the usable range and compare the result with local tile-based equalization.", "Record which details become visible and whether noise becomes more prominent."],
    questions: ["What is histogram equalization?", "Why is it useful for low-contrast images?", "How does CLAHE differ from global equalization?", "What real-world applications benefit from contrast adjustment?"],
    source: "CSST106_Lab_Experiment_03_Histogram.docx",
    benchTitle: "Contrast analysis bench",
    benchDescription: "The lower plots show how intensity values move before and after global and local enhancement.",
    code: "gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)\nequalized = cv2.equalizeHist(gray)\nclahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))\nlocal = clahe.apply(gray)",
  },
  {
    id: "lab4",
    number: "04",
    title: "SURF feature detection",
    short: "Keypoints",
    kind: "guided",
    kindLabel: "Browser fallback",
    weeks: "6",
    method: "Local feature extraction",
    objective: "Understand SURF keypoints and descriptors, visualize feature locations, and prepare for feature matching between two images.",
    concepts: ["keypoints", "descriptors", "Hessian threshold", "U-SURF", "matching"],
    checklist: ["Load a grayscale sample", "Adjust the Hessian threshold", "Visualize local feature candidates", "Compare SURF with SIFT and ORB", "Document availability or licensing limits"],
    steps: ["Load the image in grayscale and create a SURF detector with a Hessian threshold.", "Detect keypoints and descriptors, then count and draw the keypoints.", "Try a second image for descriptor matching.", "If SURF is unavailable in the environment, use ORB as a free alternative and document the change."],
    questions: ["What effect does Hessian threshold have on keypoint count?", "What are descriptors used for?", "How do SURF, SIFT, and ORB differ in speed and robustness?"],
    source: "CSST106_Lab_Experiment_04_SURF_Feature_Detection.docx",
    benchTitle: "Feature study bench",
    benchDescription: "This browser view marks repeatable local structures with a lightweight corner response. Run the supplied Python/OpenCV path for native SURF descriptors.",
    code: "surf = cv2.xfeatures2d.SURF_create(hessianThreshold=400)\nkeypoints, descriptors = surf.detectAndCompute(img, None)\nimg_keypoints = cv2.drawKeypoints(img, keypoints, None, flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)",
  },
  {
    id: "lab5",
    number: "05",
    title: "PCA / eigenfaces",
    short: "Variance space",
    kind: "guided",
    kindLabel: "Browser preview",
    weeks: "7—8",
    method: "Dimensionality reduction",
    objective: "Reduce high-dimensional face data with PCA, visualize eigenfaces, and use reduced projections as features for SVM recognition.",
    concepts: ["flattening", "centering", "components", "whitening", "SVM"],
    checklist: ["Load and flatten image samples", "Fit PCA on training data", "Visualize top components", "Plot cumulative explained variance", "Evaluate the SVM classification path"],
    steps: ["Fetch LFW faces with at least 70 images per person and split into training and test sets.", "Fit a randomized PCA model with 150 components and whitening on training data only.", "Reshape components into eigenfaces and inspect the first and last components.", "Train an RBF SVM on PCA projections and inspect precision, recall, F1, and failure cases."],
    questions: ["Why is dimensionality reduction important?", "What information can PCA discard?", "Why should features be centered?", "How does whitening help an SVM?"],
    source: "CSST106_Lab_Experiment_05_PCA_in_CV.docx",
    benchTitle: "Variance projection bench",
    benchDescription: "Add several face-like images or use the built-in variations. The browser computes a compact dual-space PCA preview; LFW and SVM remain in the supplied Python path.",
    code: "pca = PCA(n_components=150, svd_solver='randomized', whiten=True)\npca.fit(X_train)\nX_train_pca = pca.transform(X_train)\nclf = SVC(kernel='rbf', class_weight='balanced').fit(X_train_pca, y_train)",
  },
  {
    id: "lab6",
    number: "06",
    title: "YOLO object detection",
    short: "Boxes / classes",
    kind: "model",
    kindLabel: "Model required",
    weeks: "8—9",
    method: "Object detection",
    objective: "Understand pre-trained YOLO inference, dataset annotation, custom training, validation, and evaluation metrics.",
    concepts: ["YOLO format", "bounding boxes", "confidence", "precision", "recall"],
    checklist: ["Try image or video input", "Understand YOLO label format", "Organize train/val folders", "Train and validate a custom model", "Record precision, recall, and speed"],
    steps: ["Run a pre-trained YOLO model on webcam frames or an image and inspect labels, confidence, and speed.", "Collect and annotate images in normalized YOLO format with one label file per image.", "Train a YOLO model from data.yaml, then validate the best weights.", "Run inference on new images or video and analyze precision and recall."],
    questions: ["How does object detection differ from image classification?", "What does each YOLO label coordinate represent?", "Which training metric would you use to diagnose missed detections?"],
    source: "CSST106_Lab_Experiment_06_YOLOV8_Object_Detection.docx",
    benchTitle: "Detection workflow bench",
    benchDescription: "Load an image or video frame to see candidate regions highlighted. Full YOLOv11 inference requires Ultralytics and model weights in Python.",
    code: "from ultralytics import YOLO\nmodel = YOLO('YOLOv11n.pt')\nresults = model('new_image.jpg')\nresults[0].show()",
  },
  {
    id: "lab7",
    number: "07",
    title: "Segmentation techniques",
    short: "Regions / masks",
    kind: "interactive",
    kindLabel: "Browser interactive",
    weeks: "13",
    method: "Pixel-level grouping",
    objective: "Apply thresholding, region-based, edge-based, and semantic segmentation methods, then compare their strengths and limits.",
    concepts: ["Otsu", "adaptive threshold", "region growing", "watershed", "semantic mask"],
    checklist: ["Compare global and adaptive thresholding", "Explore seed-based region growth", "Trace edge-guided boundaries", "Understand semantic labels", "Discuss IoU and computational cost"],
    steps: ["Use Otsu thresholding for a simple foreground/background split.", "Use adaptive thresholding when illumination varies across the image.", "Grow a region from a seed and compare it with edge-guided boundaries.", "Use a pre-trained DeepLab or U-Net model for semantic segmentation and compare masks with ground truth when available."],
    questions: ["How do thresholding, region, edge, and semantic methods differ?", "Give one advantage and one limitation for each method.", "When would IoU be useful for evaluating a segmentation result?"],
    source: "CSST106_Lab_Experiment_07_Segmetation.docx",
    benchTitle: "Segmentation comparison bench",
    benchDescription: "Switch methods to compare binary, region, edge, and semantic-style browser previews on the same image.",
    code: "_, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)\nadaptive = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)\n# semantic path: load DeepLab or U-Net and assign one class to every pixel",
  },
];

const state = {
  currentLab: 0,
  imageCanvas: null,
  imageLabel: "Built-in reference board",
  pcaImages: null,
  segmentationMode: "threshold",
  lastResult: null,
};

const nav = document.getElementById("activity-nav");
const view = document.getElementById("activity-view");

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function svgExternal() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"></path></svg>';
}

function svgChevron() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>';
}

function renderNav() {
  nav.innerHTML = labs.map((lab, index) => `
    <button class="activity-tab" type="button" data-lab-index="${index}" data-kind="${lab.kind}" aria-current="${index === state.currentLab ? "page" : "false"}">
      <span class="tab-number">${lab.number}</span>
      <span class="tab-copy"><span class="tab-title">${escapeHtml(lab.title)}</span><span class="tab-subtitle">${escapeHtml(lab.short)}</span></span>
      <span class="tab-state" aria-hidden="true"></span>
    </button>`).join("");
}

function renderActivity() {
  const lab = labs[state.currentLab];
  renderNav();
  view.innerHTML = `
    <section class="activity-header">
      <div>
        <p class="eyebrow">LAB ACTIVITY ${lab.number} / ${lab.kindLabel.toUpperCase()}</p>
        <h1 class="activity-title">${escapeHtml(lab.title)}</h1>
        <p class="activity-intro">${escapeHtml(lab.objective)}</p>
      </div>
      <div class="activity-meta" aria-label="Activity metadata">
        <div class="meta-line"><span class="meta-label">Weeks</span><span class="meta-value">${escapeHtml(lab.weeks)}</span></div>
        <div class="meta-line"><span class="meta-label">Method</span><span class="meta-value">${escapeHtml(lab.method)}</span></div>
        <div class="meta-line"><span class="meta-label">Source</span><span class="meta-value">CSST106 handout ${lab.number}</span></div>
      </div>
    </section>
    <div class="sheet-tabs" role="tablist" aria-label="Activity views">
      <button class="sheet-tab" type="button" role="tab" aria-selected="true" data-sheet-tab="workspace">Run workspace</button>
      <button class="sheet-tab" type="button" role="tab" aria-selected="false" data-sheet-tab="method">Method notes</button>
      <button class="sheet-tab" type="button" role="tab" aria-selected="false" data-sheet-tab="report">Report checklist</button>
    </div>
    <section class="sheet-section" data-sheet-panel="workspace">
      <div class="workbench">
        <aside class="brief-panel" aria-label="Activity brief">
          <p class="panel-label">Activity brief</p>
          <div class="brief-block"><h2 class="brief-heading">Objective</h2><p class="brief-copy">${escapeHtml(lab.objective)}</p></div>
          <div class="brief-block"><h2 class="brief-heading">Concepts</h2><ul class="concept-list">${lab.concepts.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
          <div class="brief-block"><h2 class="brief-heading">Capture</h2><ul class="check-list">${lab.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul><a class="source-link" href="${encodeURI(lab.source)}" download>${svgExternal()} Open source handout</a></div>
        </aside>
        <section class="bench-panel" aria-label="Interactive activity workspace">
          <div class="bench-header"><div><h2 class="bench-title">${escapeHtml(lab.benchTitle)}</h2><p class="bench-description">${escapeHtml(lab.benchDescription)}</p></div><span class="runtime-badge ${lab.kind === "guided" ? "guided" : lab.kind === "model" ? "model" : ""}">${escapeHtml(lab.kindLabel)}</span></div>
          <div class="demo-slot">${renderDemo(lab)}</div>
          <div class="code-panel"><button class="code-toggle" type="button" aria-expanded="false" data-code-toggle><span>Reference implementation path</span>${svgChevron()}</button><pre class="code-block" data-code-block>${escapeHtml(lab.code)}</pre></div>
        </section>
      </div>
    </section>
    <section class="sheet-section" data-sheet-panel="method" hidden>
      <div class="info-layout">
        <article class="info-card"><h4>Procedure</h4><ol class="step-list">${lab.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol></article>
        <article class="info-card"><h4>Discussion prompts</h4><ul class="question-list">${lab.questions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
      </div>
    </section>
    <section class="sheet-section" data-sheet-panel="report" hidden>
      <div class="info-layout">
        <article class="info-card"><h4>Hard-copy evidence</h4><ul class="check-list">${lab.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul><p style="margin-top:14px;color:var(--ink-faint);font-size:11px;line-height:1.6">Use the captured browser output as a visual reference, then include the objective, procedure, algorithm, screenshots, observations, and conclusion in the printed report.</p></article>
        <article class="info-card"><h4>Consistency check</h4><p>Keep this activity number, title, input description, output screenshots, and conclusion aligned between Sion and the hard-copy report. Add your own measured values after running the activity in the target Python environment.</p><a class="source-link" href="${encodeURI(lab.source)}" download>${svgExternal()} Open supplied handout</a></article>
      </div>
    </section>`;

  bindActivityEvents();
  primeDemo(lab);
}

function renderDemo(lab) {
  if (lab.id === "lab1") return `
    <div class="tool-row">
      <label class="field grow"><span class="field-label">Input image</span><input class="image-input" data-input-kind="single" type="file" accept="image/*" /></label>
      <label class="field"><span class="field-label">Operation</span><select id="lab1-operation"><option value="grayscale">Grayscale</option><option value="crop">Crop ROI</option><option value="resize">Resize 65%</option><option value="rotate">Rotate 90°</option><option value="pixel">Change pixel</option></select></label>
      <button class="primary-button" type="button" data-run>Run operation</button>
    </div>
    <p class="tool-note">Current source: <strong data-image-name>${escapeHtml(state.imageLabel)}</strong>. Pixel coordinates are relative to the rendered source.</p>
    <div class="output-stage" data-stage><div class="output-grid two"><div class="output-card"><div class="output-label"><span>Input / BGR source</span><span>01</span></div><div class="canvas-wrap" data-canvas-wrap="lab1-original"><canvas id="lab1-original"></canvas></div><div class="output-caption">${escapeHtml(state.imageLabel)}</div></div><div class="output-card"><div class="output-label"><span>Transformed output</span><span>02</span></div><div class="canvas-wrap" data-canvas-wrap="lab1-result"><canvas id="lab1-result"></canvas></div><div class="output-caption" data-result-caption>Run an operation to generate the output.</div></div></div><div class="stats-strip" data-stats></div></div>`;

  if (lab.id === "lab2") return `
    <div class="tool-row"><label class="field grow"><span class="field-label">Input image</span><input class="image-input" data-input-kind="single" type="file" accept="image/*" /></label><label class="field"><span class="field-label">High threshold <span class="range-value" data-range-label="lab2-threshold">150</span></span><input id="lab2-threshold" type="range" min="40" max="240" value="150" /></label><button class="primary-button" type="button" data-run>Compare edges</button></div>
    <p class="tool-note">The Sobel view keeps gradient strength; the Canny-style view keeps stronger, thresholded contours. Adjust the threshold and compare.</p>
    <div class="output-stage" data-stage><div class="output-grid"><div class="output-card"><div class="output-label"><span>Original gray</span><span>01</span></div><div class="canvas-wrap"><canvas id="lab2-original"></canvas></div></div><div class="output-card"><div class="output-label"><span>Sobel magnitude</span><span>02</span></div><div class="canvas-wrap"><canvas id="lab2-sobel"></canvas></div></div><div class="output-card"><div class="output-label"><span>Canny-style edges</span><span>03</span></div><div class="canvas-wrap"><canvas id="lab2-canny"></canvas></div></div></div><div class="stats-strip" data-stats></div></div>`;

  if (lab.id === "lab3") return `
    <div class="tool-row"><label class="field grow"><span class="field-label">Input image</span><input class="image-input" data-input-kind="single" type="file" accept="image/*" /></label><label class="field"><span class="field-label">Local tile size</span><select id="lab3-tile"><option value="4">4 × 4 tiles</option><option value="6" selected>6 × 6 tiles</option><option value="8">8 × 8 tiles</option></select></label><button class="primary-button" type="button" data-run>Enhance contrast</button></div>
    <p class="tool-note">The browser preview uses global equalization and a tile-based local contrast pass. Native OpenCV uses <strong>cv2.createCLAHE()</strong>.</p>
    <div class="output-stage" data-stage><div class="output-grid"><div class="output-card"><div class="output-label"><span>Original</span><span>01</span></div><div class="canvas-wrap"><canvas id="lab3-original"></canvas></div></div><div class="output-card"><div class="output-label"><span>Global equalization</span><span>02</span></div><div class="canvas-wrap"><canvas id="lab3-equalized"></canvas></div></div><div class="output-card"><div class="output-label"><span>Local / CLAHE study</span><span>03</span></div><div class="canvas-wrap"><canvas id="lab3-clahe"></canvas></div></div></div><div class="output-card" style="margin-top:10px"><div class="output-label"><span>Intensity histogram</span><span>Before → after</span></div><div class="canvas-wrap"><canvas id="lab3-histogram"></canvas></div></div><div class="stats-strip" data-stats></div></div>`;

  if (lab.id === "lab4") return `
    <div class="tool-row"><label class="field grow"><span class="field-label">Input image</span><input class="image-input" data-input-kind="single" type="file" accept="image/*" /></label><label class="field"><span class="field-label">Hessian study threshold</span><select id="lab4-threshold"><option value="40">Low / more points</option><option value="70" selected>Medium</option><option value="105">High / fewer points</option></select></label><button class="primary-button" type="button" data-run>Mark keypoints</button></div>
    <p class="tool-note">Browser mode uses a lightweight local-corner response to make the idea visible. It does not claim native SURF descriptors; use the reference implementation path for OpenCV contrib.</p>
    <div class="output-stage" data-stage><div class="output-grid two"><div class="output-card"><div class="output-label"><span>Source image</span><span>01</span></div><div class="canvas-wrap"><canvas id="lab4-original"></canvas></div></div><div class="output-card"><div class="output-label"><span>Feature candidates</span><span>02</span></div><div class="canvas-wrap"><canvas id="lab4-features"></canvas></div></div></div><div class="stats-strip" data-stats></div></div>`;

  if (lab.id === "lab5") return `
    <div class="tool-row"><label class="field grow"><span class="field-label">Face/image stack</span><input id="pca-input" class="image-input" data-input-kind="pca" type="file" accept="image/*" multiple /></label><button class="secondary-button" type="button" data-pca-sample>Use reference variations</button><button class="primary-button" type="button" data-run>Compute PCA preview</button></div>
    <p class="tool-note">The compact preview uses dual-space PCA on resized grayscale images. For the assessed activity, run the provided LFW + scikit-learn workflow and report the measured explained variance.</p>
    <div class="output-stage" data-stage><div class="output-grid"><div class="output-card"><div class="output-label"><span>Mean face</span><span>μ</span></div><div class="canvas-wrap"><canvas id="lab5-mean"></canvas></div></div><div class="output-card"><div class="output-label"><span>Component 01</span><span>PC1</span></div><div class="canvas-wrap"><canvas id="lab5-pc1"></canvas></div></div><div class="output-card"><div class="output-label"><span>Component 02</span><span>PC2</span></div><div class="canvas-wrap"><canvas id="lab5-pc2"></canvas></div></div></div><div class="stats-strip" data-stats></div></div>`;

  if (lab.id === "lab6") return `
    <div class="tool-row"><label class="field grow"><span class="field-label">Image or video input</span><input id="detection-input" class="image-input" data-input-kind="detection" type="file" accept="image/*,video/*" /></label><label class="field"><span class="field-label">Preview confidence <span class="range-value" data-range-label="lab6-confidence">50%</span></span><input id="lab6-confidence" type="range" min="25" max="90" value="50" /></label><button class="primary-button" type="button" data-run>Run browser preview</button></div>
    <p class="tool-note">The overlay marks high-contrast candidate regions for workflow rehearsal. It is not YOLO inference. Install Ultralytics and load YOLOv11 weights for actual classes and confidence scores.</p>
    <div class="output-stage" data-stage><div class="output-grid two"><div class="output-card"><div class="output-label"><span>Input frame</span><span>01</span></div><div class="canvas-wrap"><canvas id="lab6-original"></canvas></div></div><div class="output-card"><div class="output-label"><span>Candidate overlay</span><span>02</span></div><div class="canvas-wrap"><canvas id="lab6-detections"></canvas></div></div></div><div class="stats-strip" data-stats></div></div><div class="notice">${svgExternal()}<span><strong>Model handoff:</strong> this app keeps the evidence surface local, while YOLOv11 inference, training, validation, and video streaming belong in the Python/Ultralytics environment described in the handout.</span></div>`;

  return `
    <div class="segmentation-switch" role="tablist" aria-label="Segmentation method"><button type="button" data-seg-mode="threshold" aria-selected="${state.segmentationMode === "threshold"}">Threshold</button><button type="button" data-seg-mode="region" aria-selected="${state.segmentationMode === "region"}">Region</button><button type="button" data-seg-mode="edge" aria-selected="${state.segmentationMode === "edge"}">Edge</button><button type="button" data-seg-mode="semantic" aria-selected="${state.segmentationMode === "semantic"}">Semantic study</button></div>
    <div class="tool-row"><label class="field grow"><span class="field-label">Input image</span><input class="image-input" data-input-kind="single" type="file" accept="image/*" /></label><button class="primary-button" type="button" data-run>Run segmentation view</button></div>
    <p class="tool-note" data-seg-note>Thresholding is strongest on clear foreground/background separation. Switch modes to compare the kind of evidence each method produces.</p>
    <div class="output-stage" data-stage><div class="output-grid two"><div class="output-card"><div class="output-label"><span>Source image</span><span>01</span></div><div class="canvas-wrap"><canvas id="lab7-original"></canvas></div></div><div class="output-card"><div class="output-label"><span>Segmentation output</span><span>02</span></div><div class="canvas-wrap"><canvas id="lab7-output"></canvas></div></div></div><div class="stats-strip" data-stats></div></div>`;
}

function bindActivityEvents() {
  document.querySelectorAll("[data-lab-index]").forEach((button) => button.addEventListener("click", () => {
    state.currentLab = Number(button.dataset.labIndex);
    state.lastResult = null;
    renderActivity();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));
  document.querySelectorAll("[data-sheet-tab]").forEach((button) => button.addEventListener("click", () => {
    const target = button.dataset.sheetTab;
    document.querySelectorAll("[data-sheet-tab]").forEach((tab) => tab.setAttribute("aria-selected", String(tab === button)));
    document.querySelectorAll("[data-sheet-panel]").forEach((panel) => { panel.hidden = panel.dataset.sheetPanel !== target; });
  }));
  document.querySelectorAll("[data-code-toggle]").forEach((button) => button.addEventListener("click", () => {
    const block = button.nextElementSibling;
    const open = block.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  }));
  document.querySelectorAll(".image-input").forEach((input) => input.addEventListener("change", (event) => handleInput(event.target)));
  document.querySelectorAll("[data-run]").forEach((button) => button.addEventListener("click", () => runDemo(labs[state.currentLab].id)));
  document.querySelectorAll("[data-range-label]").forEach((label) => {
    const input = document.getElementById(label.dataset.rangeLabel);
    if (input) input.addEventListener("input", () => { label.textContent = input.id === "lab6-confidence" ? `${input.value}%` : input.value; });
  });
  document.querySelectorAll("[data-seg-mode]").forEach((button) => button.addEventListener("click", () => {
    state.segmentationMode = button.dataset.segMode;
    document.querySelectorAll("[data-seg-mode]").forEach((item) => item.setAttribute("aria-selected", String(item === button)));
    const note = document.querySelector("[data-seg-note]");
    if (note) note.textContent = { threshold: "Thresholding is strongest on clear foreground/background separation.", region: "Region growth follows a seed and a similarity tolerance; seed choice changes the result.", edge: "Edge-based segmentation highlights boundaries and is sensitive to gaps and noise.", semantic: "Semantic segmentation assigns a class to every pixel; this browser view uses color regions as a transparent preview, not a deep model." }[state.segmentationMode];
  }));
  const pcaSample = document.querySelector("[data-pca-sample]");
  if (pcaSample) pcaSample.addEventListener("click", () => { state.pcaImages = makePcaSamples(); runDemo("lab5"); });
}

async function handleInput(input) {
  const files = [...(input.files || [])];
  if (!files.length) return;
  if (input.dataset.inputKind === "pca") {
    state.pcaImages = await Promise.all(files.slice(0, 8).map(fileToCanvas));
    state.imageLabel = `${state.pcaImages.length} uploaded samples`;
    renderActivity();
    return;
  }
  const file = files[0];
  if (input.dataset.inputKind === "detection" && file.type.startsWith("video/")) {
    state.imageLabel = `${file.name} / first frame preview`;
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.src = URL.createObjectURL(file);
    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 360;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      state.imageCanvas = fitCanvas(canvas, 760);
      URL.revokeObjectURL(video.src);
      renderActivity();
    }, { once: true });
    return;
  }
  state.imageCanvas = await fileToCanvas(file);
  state.imageLabel = file.name;
  renderActivity();
}

function fileToCanvas(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext("2d").drawImage(image, 0, 0);
        resolve(fitCanvas(canvas, 760));
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function fitCanvas(source, maxWidth) {
  if (source.width <= maxWidth) return source;
  const ratio = maxWidth / source.width;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(source.width * ratio);
  canvas.height = Math.round(source.height * ratio);
  canvas.getContext("2d").drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function makeSampleImage(variant = 0) {
  const canvas = document.createElement("canvas");
  canvas.width = 720;
  canvas.height = 440;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#0b1015";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#13242b";
  ctx.fillRect(34, 34, 652, 372);
  ctx.strokeStyle = "#1b4a55";
  ctx.lineWidth = 2;
  for (let x = 54; x < 680; x += 42) { ctx.beginPath(); ctx.moveTo(x, 34); ctx.lineTo(x, 406); ctx.stroke(); }
  for (let y = 54; y < 406; y += 42) { ctx.beginPath(); ctx.moveTo(34, y); ctx.lineTo(686, y); ctx.stroke(); }
  ctx.strokeStyle = "#f1fafb";
  ctx.lineWidth = 5;
  ctx.strokeRect(120 + variant * 7, 108, 180, 188);
  ctx.beginPath(); ctx.moveTo(390, 310); ctx.lineTo(540, 118); ctx.lineTo(630, 310); ctx.closePath(); ctx.stroke();
  ctx.fillStyle = "#57e8ff";
  ctx.beginPath(); ctx.arc(210 + variant * 7, 202, 48, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#081015";
  ctx.beginPath(); ctx.arc(210 + variant * 7, 202, 16, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#f1fafb";
  ctx.fillRect(411, 188, 78, 8);
  ctx.fillRect(435, 208, 128, 8);
  ctx.fillStyle = "#57e8ff";
  ctx.fillRect(414, 236, 160, 12);
  ctx.fillStyle = "#a7bdc3";
  ctx.font = "500 14px IBM Plex Mono, monospace";
  ctx.fillText("SION / REFERENCE FRAME", 54, 382);
  return canvas;
}

function sourceCanvas() { return state.imageCanvas ? cloneCanvas(state.imageCanvas) : makeSampleImage(); }
function cloneCanvas(source) { const canvas = document.createElement("canvas"); canvas.width = source.width; canvas.height = source.height; canvas.getContext("2d").drawImage(source, 0, 0); return canvas; }
function cloneWithSize(source, width, height) { const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height; canvas.getContext("2d").drawImage(source, 0, 0, width, height); return canvas; }

function drawTo(id, source) {
  const target = document.getElementById(id);
  if (!target || !source) return;
  target.width = source.width;
  target.height = source.height;
  target.getContext("2d").clearRect(0, 0, target.width, target.height);
  target.getContext("2d").drawImage(source, 0, 0);
}

function grayValues(canvas) {
  const ctx = canvas.getContext("2d");
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const gray = new Uint8ClampedArray(canvas.width * canvas.height);
  for (let i = 0, p = 0; i < gray.length; i++, p += 4) gray[i] = Math.round(image.data[p] * .299 + image.data[p + 1] * .587 + image.data[p + 2] * .114);
  return { width: canvas.width, height: canvas.height, data: gray };
}

function canvasFromGray(gray, width, height, colorize = false) {
  const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
  const image = canvas.getContext("2d").createImageData(width, height);
  for (let i = 0; i < gray.length; i++) { const value = gray[i]; const p = i * 4; if (colorize) { image.data[p] = Math.min(255, value * 2); image.data[p + 1] = Math.max(0, 225 - value); image.data[p + 2] = 255; } else { image.data[p] = value; image.data[p + 1] = value; image.data[p + 2] = value; } image.data[p + 3] = 255; }
  canvas.getContext("2d").putImageData(image, 0, 0); return canvas;
}

function grayscaleCanvas(source) { const g = grayValues(source); return canvasFromGray(g.data, g.width, g.height); }

function equalize(data) {
  const histogram = new Uint32Array(256); data.forEach((value) => histogram[value]++);
  const cdf = new Uint32Array(256); let running = 0; for (let i = 0; i < 256; i++) { running += histogram[i]; cdf[i] = running; }
  const first = cdf.find((value) => value > 0) || 0; const total = data.length;
  return data.map((value) => total === first ? value : Math.round(((cdf[value] - first) / (total - first)) * 255));
}

function localEqualize(data, width, height, tiles) {
  const output = new Uint8ClampedArray(data.length); const tileW = Math.ceil(width / tiles); const tileH = Math.ceil(height / tiles);
  for (let ty = 0; ty < tiles; ty++) for (let tx = 0; tx < tiles; tx++) {
    const x0 = tx * tileW, y0 = ty * tileH, x1 = Math.min(width, x0 + tileW), y1 = Math.min(height, y0 + tileH);
    const tile = []; for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) tile.push(data[y * width + x]);
    const mapped = equalize(tile); let i = 0; for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) output[y * width + x] = mapped[i++];
  }
  return output;
}

function sobel(data, width, height) {
  const out = new Uint8ClampedArray(data.length); const raw = new Float32Array(data.length); let max = 1;
  for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
    const i = y * width + x; const gx = -data[i - width - 1] - 2 * data[i - 1] - data[i + width - 1] + data[i - width + 1] + 2 * data[i + 1] + data[i + width + 1]; const gy = -data[i - width - 1] - 2 * data[i - width] - data[i - width + 1] + data[i + width - 1] + 2 * data[i + width] + data[i + width + 1]; raw[i] = Math.sqrt(gx * gx + gy * gy); max = Math.max(max, raw[i]);
  }
  for (let i = 0; i < raw.length; i++) out[i] = Math.min(255, Math.round(raw[i] * 255 / max));
  return { values: out, raw };
}

function threshold(values, value) { return values.map((item) => item >= value ? 255 : 0); }

function otsu(data) {
  const hist = new Uint32Array(256); data.forEach((v) => hist[v]++); const total = data.length; let sum = 0; for (let i = 0; i < 256; i++) sum += i * hist[i]; let sumB = 0, wB = 0, max = 0, level = 0;
  for (let i = 0; i < 256; i++) { wB += hist[i]; if (!wB) continue; const wF = total - wB; if (!wF) break; sumB += i * hist[i]; const mB = sumB / wB; const mF = (sum - sumB) / wF; const between = wB * wF * (mB - mF) ** 2; if (between > max) { max = between; level = i; } }
  return level;
}

function histogramCanvas(dataA, dataB) {
  const canvas = document.createElement("canvas"); canvas.width = 720; canvas.height = 210; const ctx = canvas.getContext("2d"); ctx.fillStyle = "#070b0f"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  const makeHist = (data) => { const h = new Uint32Array(256); data.forEach((v) => h[v]++); return h; }; const a = makeHist(dataA), b = makeHist(dataB); const max = Math.max(...a, ...b, 1);
  for (let i = 0; i < 256; i++) { const x = i * 2.8; ctx.fillStyle = "rgba(167,189,195,.38)"; ctx.fillRect(x, 195 - (a[i] / max) * 170, 2, (a[i] / max) * 170); ctx.fillStyle = "rgba(87,232,255,.8)"; ctx.fillRect(x + 1, 195 - (b[i] / max) * 170, 1, (b[i] / max) * 170); }
  ctx.fillStyle = "#738b92"; ctx.font = "10px IBM Plex Mono, monospace"; ctx.fillText("0", 5, 207); ctx.fillText("intensity 255", 626, 207); return canvas;
}

function stat(label, value, accent = false) { return `<div class="stat-cell"><span class="stat-label">${escapeHtml(label)}</span><span class="stat-value${accent ? " accent" : ""}">${escapeHtml(value)}</span></div>`; }
function setStats(values) { const target = document.querySelector("[data-stats]"); if (target) target.innerHTML = values.map((item) => stat(item[0], item[1], item[2])).join(""); }
function markStage() { const stage = document.querySelector("[data-stage]"); if (!stage) return; stage.dataset.running = "true"; setTimeout(() => { stage.dataset.running = "false"; }, 580); }

function primeDemo(lab) {
  const source = sourceCanvas();
  if (lab.id === "lab1") { drawTo("lab1-original", source); drawTo("lab1-result", grayscaleCanvas(source)); setStats([["Width", `${source.width}px`], ["Height", `${source.height}px`], ["Channels", "3 → 1"], ["Source", state.imageCanvas ? "Upload" : "Sample"],]); return; }
  if (lab.id === "lab2") { drawTo("lab2-original", grayscaleCanvas(source)); drawTo("lab2-sobel", canvasFromGray(sobel(grayValues(source).data, source.width, source.height).values, source.width, source.height)); drawTo("lab2-canny", canvasFromGray(threshold(sobel(grayValues(source).data, source.width, source.height).values, 150), source.width, source.height)); setStats([["Source", state.imageCanvas ? "Upload" : "Sample"], ["Blur", "3 × 3"] , ["Method", "Sobel + Canny"], ["Threshold", "150", true]]); return; }
  if (lab.id === "lab3") { runLab3(false); return; }
  if (lab.id === "lab4") { runLab4(false); return; }
  if (lab.id === "lab5") { if (!state.pcaImages) state.pcaImages = makePcaSamples(); runLab5(false); return; }
  if (lab.id === "lab6") { drawTo("lab6-original", source); drawTo("lab6-detections", source); setStats([["Input", state.imageCanvas ? "Upload" : "Sample"], ["Runtime", "Model-ready"], ["Classes", "Not loaded"], ["Result", "Preview only", true]]); return; }
  if (lab.id === "lab7") { runLab7(false); }
}

function runDemo(id) {
  markStage(); state.lastResult = id;
  if (id === "lab1") runLab1(); else if (id === "lab2") runLab2(); else if (id === "lab3") runLab3(true); else if (id === "lab4") runLab4(true); else if (id === "lab5") runLab5(true); else if (id === "lab6") runLab6(true); else if (id === "lab7") runLab7(true);
}

function runLab1() {
  const source = sourceCanvas(); const operation = document.getElementById("lab1-operation")?.value || "grayscale"; let result = grayscaleCanvas(source); let caption = "Color channels collapsed into luminance.";
  if (operation === "crop") { const w = Math.round(source.width * .68), h = Math.round(source.height * .68); result = cloneWithSize(source, w, h); const ctx = result.getContext("2d"); ctx.strokeStyle = "#57e8ff"; ctx.lineWidth = 4; ctx.strokeRect(2, 2, w - 4, h - 4); caption = "Centered region of interest, 68% of source."; }
  if (operation === "resize") { result = cloneWithSize(source, Math.max(1, Math.round(source.width * .65)), Math.max(1, Math.round(source.height * .65))); caption = "Scaled to 65% of the source dimensions."; }
  if (operation === "rotate") { result = document.createElement("canvas"); result.width = source.height; result.height = source.width; const ctx = result.getContext("2d"); ctx.translate(result.width, 0); ctx.rotate(Math.PI / 2); ctx.drawImage(source, 0, 0); caption = "90° clockwise rotation."; }
  if (operation === "pixel") { result = cloneCanvas(source); const ctx = result.getContext("2d"); const x = Math.round(result.width * .5), y = Math.round(result.height * .5); ctx.fillStyle = "#57e8ff"; ctx.fillRect(x - 10, y - 10, 20, 20); caption = `Pixel neighborhood changed near (${x}, ${y}).`; }
  drawTo("lab1-original", source); drawTo("lab1-result", result); const c = document.querySelector("[data-result-caption]"); if (c) c.textContent = caption; setStats([["Width", `${source.width}px`], ["Height", `${source.height}px`], ["Operation", operation], ["Output", `${result.width} × ${result.height}`, true]]);
}

function runLab2() {
  const source = sourceCanvas(); const g = grayValues(source); const thresholdValue = Number(document.getElementById("lab2-threshold")?.value || 150); const result = sobel(g.data, g.width, g.height); drawTo("lab2-original", canvasFromGray(g.data, g.width, g.height)); drawTo("lab2-sobel", canvasFromGray(result.values, g.width, g.height)); drawTo("lab2-canny", canvasFromGray(threshold(result.values, thresholdValue), g.width, g.height)); setStats([["Blur", "3 × 3"], ["Sobel", "X + Y"], ["High threshold", String(thresholdValue)], ["Edge map", "Updated", true]]);
}

function runLab3() {
  const source = sourceCanvas(); const g = grayValues(source); const eq = equalize(g.data); const tiles = Number(document.getElementById("lab3-tile")?.value || 6); const clahe = localEqualize(g.data, g.width, g.height, tiles); drawTo("lab3-original", canvasFromGray(g.data, g.width, g.height)); drawTo("lab3-equalized", canvasFromGray(eq, g.width, g.height)); drawTo("lab3-clahe", canvasFromGray(clahe, g.width, g.height)); drawTo("lab3-histogram", histogramCanvas(g.data, clahe)); const before = Math.round(g.data.reduce((a, b) => a + b, 0) / g.data.length); const after = Math.round(clahe.reduce((a, b) => a + b, 0) / clahe.length); setStats([["Mean before", String(before)], ["Mean local", String(after)], ["Tiles", `${tiles} × ${tiles}`], ["Histogram", "Plotted", true]]);
}

function detectFeatures(source, thresholdValue) {
  const g = grayValues(source); const { raw } = sobel(g.data, g.width, g.height); const points = []; const step = Math.max(4, Math.round(Math.min(g.width, g.height) / 100)); const localRadius = Math.max(3, step);
  let maxResponse = 1; for (let i = 0; i < raw.length; i++) maxResponse = Math.max(maxResponse, raw[i]);
  for (let y = localRadius; y < g.height - localRadius; y += step) for (let x = localRadius; x < g.width - localRadius; x += step) { const i = y * g.width + x; const value = raw[i]; if (value < maxResponse * (thresholdValue / 160)) continue; let peak = true; for (let oy = -localRadius; oy <= localRadius && peak; oy += localRadius) for (let ox = -localRadius; ox <= localRadius; ox += localRadius) if (raw[(y + oy) * g.width + x + ox] > value) peak = false; if (peak) points.push({ x, y, r: 3 + Math.round(value / maxResponse * 9) }); }
  return { g, points: points.slice(0, 72) };
}

function featureCanvas(source, points) { const out = cloneCanvas(source); const ctx = out.getContext("2d"); ctx.strokeStyle = "#57e8ff"; ctx.fillStyle = "rgba(87,232,255,.16)"; ctx.lineWidth = 2; points.forEach(({ x, y, r }) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - r - 3, y); ctx.lineTo(x + r + 3, y); ctx.moveTo(x, y - r - 3); ctx.lineTo(x, y + r + 3); ctx.stroke(); }); return out; }

function runLab4() { const source = sourceCanvas(); const selectValue = Number(document.getElementById("lab4-threshold")?.value || 70); const { points } = detectFeatures(source, selectValue); drawTo("lab4-original", grayscaleCanvas(source)); drawTo("lab4-features", featureCanvas(source, points)); setStats([["Candidates", String(points.length)], ["Study threshold", String(selectValue)], ["Browser mode", "Corner response"], ["Native path", "SURF / OpenCV", true]]); }

function makePcaSamples() { const source = sourceCanvas(); return [source, cloneWithSize(source, source.width, source.height), makeSampleImage(1), makeSampleImage(2)]; }

function smallVector(canvas, size = 32) { const small = cloneWithSize(canvas, size, size); const g = grayValues(small).data; return [...g].map((v) => v / 255); }
function dot(a, b) { let total = 0; for (let i = 0; i < a.length; i++) total += a[i] * b[i]; return total; }
function norm(a) { return Math.sqrt(dot(a, a)) || 1; }
function normalize(a) { const n = norm(a); return a.map((v) => v / n); }

function pcaPreview(images) {
  const size = 32; const vectors = images.map((image) => smallVector(image, size)); const n = vectors.length; const d = size * size; const mean = Array(d).fill(0); vectors.forEach((vector) => vector.forEach((value, index) => mean[index] += value / n)); const centered = vectors.map((vector) => vector.map((value, index) => value - mean[index]));
  const gram = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => dot(centered[i], centered[j]) / Math.max(1, n - 1))); const components = []; const eigenvalues = [];
  for (let component = 0; component < Math.min(3, n); component++) { let vector = normalize(Array.from({ length: n }, (_, index) => 1 + ((index + 1) * (component + 2)) % 7)); for (let iteration = 0; iteration < 35; iteration++) { const next = gram.map((row) => dot(row, vector)); components.forEach((prior) => { const projection = dot(next, prior.vector); for (let i = 0; i < next.length; i++) next[i] -= projection * prior.vector[i]; }); vector = normalize(next); } const eigenvalue = dot(vector, gram.map((row) => dot(row, vector))); eigenvalues.push(Math.max(0, eigenvalue)); components.push({ vector, eigenvalue }); }
  const totalVariance = gram.reduce((sum, row, i) => sum + row[i], 0); const componentCanvases = components.map(({ vector }) => { const values = Array(d).fill(0); for (let i = 0; i < n; i++) for (let j = 0; j < d; j++) values[j] += vector[i] * centered[i][j]; const min = Math.min(...values), max = Math.max(...values); return canvasFromGray(values.map((value) => Math.round(((value - min) / Math.max(.00001, max - min)) * 255)), size, size); }); return { mean: canvasFromGray(mean.map((value) => Math.round(value * 255)), size, size), components: componentCanvases, retained: totalVariance ? eigenvalues.reduce((a, b) => a + b, 0) / totalVariance : 0, count: n, features: d };
}

function runLab5() { const images = state.pcaImages?.length ? state.pcaImages : makePcaSamples(); const preview = pcaPreview(images); drawTo("lab5-mean", preview.mean); drawTo("lab5-pc1", preview.components[0] || preview.mean); drawTo("lab5-pc2", preview.components[1] || preview.mean); setStats([["Samples", String(preview.count)], ["Features", `${preview.features} px`], ["Top 3 variance", `${Math.round(preview.retained * 100)}%`], ["Mode", "Dual-space PCA", true]]); }

function connectedComponents(gray, width, height, thresholdValue) {
  const visited = new Uint8Array(gray.length); const boxes = []; const binary = gray.map((value) => value > thresholdValue ? 1 : 0); const queue = [];
  for (let y = 1; y < height - 1; y += 3) for (let x = 1; x < width - 1; x += 3) { const start = y * width + x; if (!binary[start] || visited[start]) continue; visited[start] = 1; queue.push(start); let minX = x, maxX = x, minY = y, maxY = y, count = 0; while (queue.length) { const current = queue.pop(); const cx = current % width, cy = Math.floor(current / width); count++; minX = Math.min(minX, cx); maxX = Math.max(maxX, cx); minY = Math.min(minY, cy); maxY = Math.max(maxY, cy); for (const [dx, dy] of [[3,0],[-3,0],[0,3],[0,-3]]) { const nx = cx + dx, ny = cy + dy; if (nx < 1 || nx >= width - 1 || ny < 1 || ny >= height - 1) continue; const ni = ny * width + nx; if (binary[ni] && !visited[ni]) { visited[ni] = 1; queue.push(ni); } } } if (count > 18 && maxX - minX > 10 && maxY - minY > 10) boxes.push({ minX, maxX, minY, maxY, count }); }
  return boxes.sort((a, b) => b.count - a.count).slice(0, 6);
}

function detectionCanvas(source, boxes) { const out = cloneCanvas(source); const ctx = out.getContext("2d"); ctx.font = "600 12px IBM Plex Mono, monospace"; boxes.forEach((box, index) => { ctx.strokeStyle = "#57e8ff"; ctx.lineWidth = 3; ctx.strokeRect(box.minX, box.minY, box.maxX - box.minX, box.maxY - box.minY); ctx.fillStyle = "#57e8ff"; const label = `candidate ${String(index + 1).padStart(2, "0")}`; ctx.fillRect(box.minX, Math.max(0, box.minY - 21), ctx.measureText(label).width + 12, 21); ctx.fillStyle = "#061014"; ctx.fillText(label, box.minX + 6, Math.max(15, box.minY - 7)); }); return out; }

function runLab6() { const source = sourceCanvas(); const g = grayValues(source); const confidence = Number(document.getElementById("lab6-confidence")?.value || 50); const boxes = connectedComponents(g.data, g.width, g.height, 245 - confidence); drawTo("lab6-original", source); drawTo("lab6-detections", detectionCanvas(source, boxes)); setStats([["Candidates", String(boxes.length)], ["Preview cutoff", `${confidence}%`], ["Classes", "Not loaded"], ["Runtime", "YOLO handoff", true]]); }

function regionGrow(gray, width, height) { const seedX = Math.floor(width / 2), seedY = Math.floor(height / 2), seed = gray[seedY * width + seedX], tolerance = 30; const output = new Uint8ClampedArray(gray.length); const visited = new Uint8Array(gray.length); const queue = [seedY * width + seedX]; visited[queue[0]] = 1; while (queue.length) { const i = queue.shift(); if (Math.abs(gray[i] - seed) > tolerance) continue; output[i] = 255; const x = i % width, y = Math.floor(i / width); for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) { const nx = x + dx, ny = y + dy; if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue; const ni = ny * width + nx; if (!visited[ni]) { visited[ni] = 1; queue.push(ni); } } } return output; }

function semanticStudy(source) { const image = source.getContext("2d").getImageData(0, 0, source.width, source.height); const output = new Uint8ClampedArray(source.width * source.height); for (let i = 0, p = 0; i < output.length; i++, p += 4) { const r = image.data[p], g = image.data[p + 1], b = image.data[p + 2]; const brightness = (r + g + b) / 3; output[i] = brightness > 190 ? 255 : b > r * 1.15 ? 175 : r > g * 1.2 ? 95 : 35; } return canvasFromGray(output, source.width, source.height, true); }

function runLab7() { const source = sourceCanvas(); const g = grayValues(source); let output, label; if (state.segmentationMode === "threshold") { const level = otsu(g.data); output = canvasFromGray(threshold(g.data, level), g.width, g.height); label = `Otsu threshold ${level}`; } else if (state.segmentationMode === "region") { output = canvasFromGray(regionGrow(g.data, g.width, g.height), g.width, g.height); label = "Seed region / tolerance 30"; } else if (state.segmentationMode === "edge") { const edges = sobel(g.data, g.width, g.height); output = canvasFromGray(threshold(edges.values, 145), g.width, g.height); label = "Canny-style boundary view"; } else { output = semanticStudy(source); label = "Color-region study / model handoff"; } drawTo("lab7-original", source); drawTo("lab7-output", output); setStats([["Mode", state.segmentationMode], ["Output", label], ["Input", `${g.width} × ${g.height}`], ["IoU", "Add ground truth", true]]); }

document.getElementById("reset-workspace").addEventListener("click", () => { state.imageCanvas = null; state.imageLabel = "Built-in reference board"; state.pcaImages = null; state.segmentationMode = "threshold"; state.lastResult = null; renderActivity(); });
document.getElementById("about-toggle").addEventListener("click", () => document.getElementById("about-dialog").showModal());
document.getElementById("about-close").addEventListener("click", () => document.getElementById("about-dialog").close());
document.getElementById("about-dialog").addEventListener("click", (event) => { if (event.target === event.currentTarget) event.currentTarget.close(); });

renderActivity();
