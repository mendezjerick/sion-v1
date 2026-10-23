# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: a dependency-light static HTML, CSS, and JavaScript app so the instructor can open the project locally without a backend or model download

## Users

Primary users are CSST106 students completing computer vision laboratory activities and an instructor reviewing their implementations, screenshots, and conclusions in one place.

## Product Purpose

Sion is a single Web UI that compiles Lab Activities 1 through 7 into one navigable workspace. It makes each activity reviewable as a clearly labeled module, provides browser-side demonstrations where practical, and keeps objectives, method notes, code guidance, questions, and outputs together for checking.

## Positioning

The app is a lab notebook that behaves like a small vision workbench: the same uploaded image can move through several classic computer vision operations while the activity record stays visible beside the result.

## Operating Context

Students use the UI on a laptop during laboratory work and later use it to organize evidence for a printed report. An instructor opens the project locally or from GitHub and navigates activities from a single shell. The seven supplied DOCX handouts are the source of truth for activity titles, objectives, procedures, questions, and deliverables.

## Capabilities and Constraints

- Seven labeled activity modules must be accessible from one app shell.
- Activity 1 supports image upload, grayscale conversion, crop, resize, rotate, and pixel inspection in the browser.
- Activity 2 supports browser-side Sobel and Canny-style edge views with tunable thresholds.
- Activity 3 supports histogram inspection, global equalization, contrast stretching, and CLAHE-inspired local contrast processing.
- Activity 4 presents SURF theory and a browser-safe local feature visualization fallback; native SURF and descriptor matching remain documented as Python/OpenCV work because OpenCV contrib is not bundled into a static browser app.
- Activity 5 presents PCA/eigenfaces workflow and provides a browser-side grayscale variance gallery from supplied images; LFW/SVM execution remains documented as a Python/scikit-learn workflow.
- Activity 6 provides image/video input and a transparent browser preview for detection workflow; YOLO inference/training remains documented as a Python/Ultralytics workflow that requires model weights and a runtime.
- Activity 7 provides threshold, region, edge, and semantic-segmentation study views with browser-side threshold/contour output and clearly labeled model-workflow guidance for deep semantic segmentation.
- The UI must distinguish implemented browser demos from Python/model-dependent procedures; it must not claim model inference that has not run.

## Brand Commitments

The user requested a Sinon / Sword Art Online Alternative Gun Gale Online inspired direction: mostly black, cyan, and white, with restrained cyan used semantically for active states, focus, and technical highlights.

## Evidence on Hand

The repository contains seven supplied DOCX handouts:

- CSST106_Lab_Experiment_01_Images.docx
- CSST106_Lab_Experiment_02_Edge_Detection..docx
- CSST106_Lab_Experiment_03_Histogram.docx
- CSST106_Lab_Experiment_04_SURF_Feature_Detection.docx
- CSST106_Lab_Experiment_05_PCA_in_CV.docx
- CSST106_Lab_Experiment_06_YOLOV8_Object_Detection.docx
- CSST106_Lab_Experiment_07_Segmetation.docx

No student-specific screenshots, dataset, trained weights, or report content were supplied. The app must not fabricate those results.

## Product Principles

- Every activity is findable in seconds.
- The UI teaches the procedure while making the result visible.
- Browser demos are useful, deterministic, and explicit about their scope.
- Evidence and report requirements stay adjacent to the implementation.
- The visual system is dark, precise, and recognizably cyan without turning every element into decoration.

## Accessibility & Inclusion

Use keyboard navigable controls, visible focus states, semantic landmarks, descriptive labels, readable contrast, reduced-motion support, and text alternatives for visual outputs.
