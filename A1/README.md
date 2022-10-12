CMPT 361 - Introduction to Computer Graphics (and Vision)
Programming Assignment 1
In this assignment, you will filter images and analyze them both in the spatial and requency domain. You will also play with Canny edge detection parameters to find the best option for your images.

You can do this assignment in any language. However, as we cover all these topics with Matlab demonstrations in lectures, it will be easier in Matlab. If you use another language, you need to submit your code with a readme file with detailed explanations on how to run your code (the libraries you used etc.).

You need to submit your source code and your report through Coursys. Once run, your code should save each result image with the filenames defined below with a single click. Your report will be an html file together with your result images. The provided template uses these filenames to display your results.

When saving your resulting images (filtered image, frequency magnitude image, edge image etc.), you should use the imwrite function to save them as png. When saving visualizations (when we use surf, for example) save them using the saveas(gcf, ‘filename’) function in Matlab to save them again as png.

1: Take two photographs
You will use two images in your analysis, and the first part is finding these images! You can take your own photographs (encouraged) or find images from the internet. One photograph should have a lot of high-frequency components (many edges all around) and the other should have mostly low-frequency components. You have seen such a pair in the Signals & Images and Sampling & Aliasing lectures.

Resize and crop your photographs and convert to grayscale to get a pair of 500x500 grayscale images. We will refer to these 500x500 images as HP (high-pass) and LP (low-pass) in the rest of this assignment.

Save these 500x500 grayscale images as HP.png and LP.png

You might want to have several options for both. If you are not able to observe aliasing in HP or if you observe heavy aliasing in LP in the corresponding questions below, you need to change your images.

2: Compute frequency representations (1 pt)
Compute the Fourier transforms of HP and LP and visualize their magnitude. As we did in the lecture, you may need to use a multiplier to display the frequency response properly. Don’t forget to fftshift.

Save the frequency response magnitude as images with adjusted brightness for better viewing as HP-freq.png and LP-freq.png

3: Visualize kernels (2 pts)
Define a sobel kernel, a Gaussian kernel, and a derivative-of-Gaussian (DoG) kernel. The derivative kernels should only be in a single direction. The Gaussian kernels should have the standard deviation of 2.5. Determine the kernel size of your Gaussian kernel by examining it with surf function. It shouldn’t be too large or too small. Compute your DoG kernel using the first two kernels you defined. Save the surf visualizations of the Gaussian and DoG kernels as gaus-surf.png and dog-surf.png.

Apply the Gaussian filter to HP and LP. Compute the frequency domain representation of the filtered images. Save the filtered images and freq. domain versions as HP-filt.png, HP-filt-freq.png, LP-filt.png, and LP-filt-freq.png.

Compute the Fourier transform of the DoG kernels using the transform size of 500x500. Apply this filter to both images in the frequency domain and convert them back to spatial domain. Save the filtered images and freq. domain versions as HP-dogfilt.png, HP-dogfilt-freq.png, LP-dogfilt.png, and LP-dogfilt-freq.png.

4: Anti-aliasing (4 pts)
Subsample the two images (using 1:2:end) to half the size in both dimensions. You should observe aliasing in HP and no aliasing in LP. Save the subsampled images and freq. domain versions as HP-sub2.png, HP-sub2-freq.png, LP-sub2.png, and LP-sub2-freq.png. In your report, comment on where the aliasing happens in both spatial and frequency domains.

Subsample the two images (using 1:4:end) to quarter the size in both dimensions. Save the subsampled images and freq. domain versions as HP-sub4.png, HP-sub4-freq.png, LP-sub4.png, and LP-sub4-freq.png. In your report, comment on where the aliasing happens in both spatial and frequency domains.

Apply anti-aliasing to HP for half and quarter options. You need to determine the size and standard deviation of the Gaussian kernels you use for anti-aliasing. They should not smooth the images more than necessary to make aliasing disappear. Hence, you need to find two different Gaussian kernels for half and quarter versions. Save the anti-aliased subsampled images and freq. domain versions as HP-sub2-aa.png, HP-sub2-aa-freq.png, HP-sub4-aa.png, and HP-sub4-aa-freq.png. Note the size and standard deviations of the two Gaussian filters you used in your report. Comment on the frequency content of subsampled images and compare them to the versions without anti-aliasing.

5: Canny edge detection thresholding (3 pts)
As we saw in lecture, canny edge detection has a low and a high threshold for determining edges. You will determine the best values for these two numbers for HP and LP separately that, in your view, give the optimum edge representation for a particular image.

Apply Canny edge detection and get the default parameters computed by Matlab (or the library you’re using for other languages). You will calibrate these two parameters until you are satisfied with the result. One hint: You can sweep these parameters and save every result as png files with thresholds noted in the name of the file. Then you can use your favourite image viewer to select the best ones.

Compute 5 edge representations for HP. One with optimal thresholds, one with a lower low threshold, one with a higher low threshold, one with a lower high threshold, and one with a higher high threshold. Save them as HP-canny-optimal.png, HP-canny-lowlow.png, HP-canny-highlow.png, HP-canny-lowhigh.png, and HP-canny-highhigh.png. Comment on why you chose the optimal parameters by comparing it the optimal edges to other versions (here that edge appears, here this esge disappears etc.). If your optimal edges are still not perfect, comment on which edges should have been included / excluded by a better edge detection method.

Repeat the same thing for LP. Save all 5 versions as LP-canny-/fillintheblanks/.png

6 Report
The report template is here: HTML template

All you need to do is to save the images in the current folder as your html file, and fill in the required information and comments in the html file. Don’t edit the template further than needed.

You’ll submit your report as an html file in a .zip container together with all the results you have saved. You need to add the necessary comments asked in the question definitions.

You also have to add the following honor statement to the beginning of your report:

I have not cheated in any way when doing this assignment, I did it on my own. I may have asked questions about the assignment on Piazza, I know that’s totally fine and even encouraged. I also already know that this class is graded on a curve. I realize that if I cheat and by some miracle not get caught, any increase in my grade will in turn shift the curve and result in lower grades for my classmates. Any undeserved extra grade would come at the cost of all others. That’s horrible! I would never do it.
