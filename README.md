# Sion — Computer Vision Lab

Sion is a single Web UI for CSST106 Computer Vision laboratory activities 1 through 7. It compiles the supplied handouts into one reviewable workspace and keeps browser-run demonstrations next to objectives, procedures, report checklists, and the native Python/model path.

## Run locally

No package install is required. From this folder, run:

```powershell
.\start.ps1
```

Then open `http://127.0.0.1:4173`. To open it automatically, use `.\start.ps1 -OpenBrowser`. Stop the server with `.\stop.ps1`.

The script looks for a working `py -3` or `python` command. If Python is installed in a custom location, pass it explicitly with `.\start.ps1 -PythonPath "C:\path\to\python.exe"`.

If PowerShell blocks local scripts on a new machine, run the command in the current session first:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
```

## Activities

1. Image fundamentals — grayscale, crop, resize, rotation, and pixel operations
2. Edge detection — Sobel and Canny-style comparison
3. Histogram and contrast — global equalization, local contrast, and histograms
4. SURF feature detection — browser-safe local feature study plus OpenCV contrib path
5. PCA and eigenfaces — compact dual-space PCA preview plus LFW/SVM path
6. YOLO object detection — input frame workflow preview plus Ultralytics path
7. Segmentation — threshold, region, edge, and semantic-study views

## Scope notes

Uploads stay in the browser. Classic image operations run locally without a server. SURF descriptors, LFW retrieval, SVM evaluation, YOLO inference/training, and deep semantic segmentation require the Python runtimes, libraries, datasets, and model weights specified in the supplied handouts; the UI labels those handoffs explicitly instead of fabricating model results.

## Hard-copy report

Use the Report checklist inside each activity to prepare a consistent printed report. Include objectives, procedures, algorithms, screenshots, observations, measured values from your actual runtime, and conclusions for all seven activities.
