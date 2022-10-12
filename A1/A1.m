%Part 1
    %Import images
    HP = imread('White_skyscraper_in_Montreal_(Unsplash).jpg');
    LP = imread('pexels-cottonbro-9589472.jpg');
    %Convert to greyscale
    HP = rgb2gray(HP);
    LP = rgb2gray(LP);
    %Crop then resize
    HP = HP(1:3442, 1:3442);
    LP = LP(1:853, 213:1066);
    HP = imresize(HP, [500 500]); 
    LP = imresize(LP, [500 500]);
    %Save the images as a png
    imwrite(HP, 'HP.png');
    imwrite(LP, 'LP.png');

%Part 2
    %Compute fourier transforms
    HP_freq = fft2(HP);
    LP_freq = fft2(LP);
    %Shift the center frequency location
    HP_freq_save = fftshift(abs(HP_freq));
    LP_freq_save = fftshift(abs(LP_freq));
    %Use a mutliplier to display result correctly
    HP_freq_save = HP_freq_save/30000;
    LP_freq_save = LP_freq_save/30000;
    %Save the frequency repsonses to a png
    imwrite(HP_freq_save, 'HP-freq.png');
    imwrite(LP_freq_save, 'LP-freq.png');

%Part 3
    %Defining our kernels
    sob = [-1 0 1; -2 0 2; -1 0 1];
    gauskern = fspecial('gaussian', 16, 2.5);
    dog = conv2(gauskern, sob);
    %Display surf of gaus closeand dog 
    saveas(surf(gauskern), 'gaus-surf.png');
    saveas(surf(dog), 'dog-surf.png');
    close all;
    %Apply gaussian filter to HP and LP
    HP_filt = imfilter(HP, gauskern);
    LP_filt = imfilter(LP, gauskern);
    %Compute the frequency domain representaions of HP-filt and LP-filt
    HP_filt_freq = fft2(HP_filt);
    LP_filt_freq = fft2(LP_filt);
    %Save the filtered images and freq. domain versions
    imwrite(HP_filt, 'HP-filt.png');
    imwrite(LP_filt, 'LP-filt.png');
    imwrite(fftshift(abs(HP_filt_freq))/30000, 'HP-filt-freq.png');
    imwrite(fftshift(abs(LP_filt_freq))/30000, 'LP-filt-freq.png');
    %Compute fourier transform of DoG kernel
    dogfilt = fft2(dog, 500, 500);
    %Apply new filter to both images
    HP_dogfilt_freq = HP_freq.*dogfilt;
    LP_dogfilt_freq = LP_freq.*dogfilt;
    %Convert filtered images back to spatial domain
    HP_dogfilt = ifft2(HP_dogfilt_freq);
    LP_dogfilt = ifft2(LP_dogfilt_freq);
    %Save filtered images and freq. domain versions with dog
    imwrite(HP_dogfilt/150, 'HP-dogfilt.png');
    imwrite(LP_dogfilt/30, 'LP-dogfilt.png');
    imwrite(abs(fftshift(HP_dogfilt_freq))/100, 'HP-dogfilt-freq.png');
    imwrite(abs(fftshift(LP_dogfilt_freq))/100, 'LP-dogfilt-freq.png');

%Part 4
    %Subsample the two images to half
    HP_sub2 = HP(1:2:end, 1:2:end);
    LP_sub2 = LP(1:2:end, 1:2:end);
    %Subsample the two images to quater
    HP_sub4 = HP(1:4:end, 1:4:end);
    LP_sub4 = LP(1:4:end, 1:4:end);
    %Compute frequency domains of subsampled images
    HP_sub2_freq = fft2(HP_sub2);
    LP_sub2_freq = fft2(LP_sub2);
    HP_sub4_freq = fft2(HP_sub4);
    LP_sub4_freq = fft2(LP_sub4);
    %Save the subsampled images
    imwrite(HP_sub2, 'HP-sub2.png');
    imwrite(LP_sub2, 'LP-sub2.png');
    imwrite(HP_sub4, 'HP-sub4.png');
    imwrite(LP_sub4, 'LP-sub4.png');
    imwrite(abs(fftshift(HP_sub2_freq))/40000, 'HP-sub2-freq.png');
    imwrite(abs(fftshift(LP_sub2_freq))/40000, 'LP-sub2-freq.png');
    imwrite(abs(fftshift(HP_sub4_freq))/40000, 'HP-sub4-freq.png');
    imwrite(abs(fftshift(LP_sub4_freq))/40000, 'LP-sub4-freq.png');
    %Apply anti-aliasing to HP
    sub2_gaus = fspecial('gaussian', 12, 1.8);
    sub4_gaus = fspecial('gaussian', 19, 3.2);
    sub2_filt = imfilter(HP, sub2_gaus);
    sub4_filt = imfilter(HP, sub4_gaus);
    %Subsample the aa image to half
    HP_sub2_aa = sub2_filt(1:2:end, 1:2:end);
    %Subsample the aa image to quater
    HP_sub4_aa = sub4_filt(1:4:end, 1:4:end);
    %Compute frequency domains of anti-aliased images
    HP_sub2_aa_freq = fft2(HP_sub2_aa);
    HP_sub4_aa_freq = fft2(HP_sub4_aa);
    %Save the anti aliased images and their frequency domain counterparts
    imwrite(HP_sub2_aa, 'HP-sub2-aa.png');
    imwrite(HP_sub4_aa, 'HP-sub4-aa.png');
    imwrite(abs(fftshift(HP_sub2_aa_freq))/40000, 'HP-sub2-aa-freq.png');
    imwrite(abs(fftshift(HP_sub4_aa_freq))/40000, 'HP-sub4-aa-freq.png');

%Part 5
    %Getting default canny parameters
    [cannyedgeHP, threshHP] = edge(HP, 'canny');
    [cannyedgeLP, threshLP] = edge(LP, 'canny');
    disp("HP default thresholds");
    disp(threshHP);
    disp("LP default thresholds");
    disp(threshLP);
    %Applying canny edge detection
    HP_canny_optimal = edge(HP, 'canny', [.03 .05]); 
    HP_canny_lowlow = edge(HP, 'canny', [.0001 .05]); %More false lines picked up at very top of building
    HP_canny_highlow = edge(HP, 'canny', [.0499999 .25]); %loose some windows near top of building, and loss of entire background building to the right
    HP_canny_lowhigh = edge(HP, 'canny', [.03 .0399]); %More false lines picked up at very top of building
    HP_canny_highhigh = edge(HP, 'canny', [.03 .25]);  %Lose right side edge of building and entire background building

    LP_canny_optimal = edge(LP, 'canny', [.1 .200398]); %Optimization not perfect, some of the outer edges on the window pane to the left are missing
    LP_canny_lowlow = edge(LP, 'canny', [.01 .200398]);     %Here the outer edges of the window on the left pick up false edges
    LP_canny_highlow = edge(LP, 'canny', [.2 .200398]); %Here the outer edges of the window on the left are left out of the image
    LP_canny_lowhigh = edge(LP, 'canny', [.1 .12]); %Here there are false edges picked up in the middle of the image
    LP_canny_highhigh = edge(LP, 'canny', [.1 .9]); %Here most of the edges on the image are missing
    %Save the edge representations of HP and LP
    imwrite(HP_canny_optimal, 'HP-canny-optimal.png');
    imwrite(HP_canny_lowlow, 'HP-canny-lowlow.png');
    imwrite(HP_canny_highlow, 'HP-canny-highlow.png');
    imwrite(HP_canny_lowhigh, 'HP-canny-lowhigh.png');
    imwrite(HP_canny_highhigh, 'HP-canny-highhigh.png');

    imwrite(LP_canny_optimal, 'LP-canny-optimal.png');
    imwrite(LP_canny_lowlow, 'LP-canny-lowlow.png');
    imwrite(LP_canny_highlow, 'LP-canny-highlow.png');
    imwrite(LP_canny_lowhigh, 'LP-canny-lowhigh.png');
    imwrite(LP_canny_highhigh, 'LP-canny-highhigh.png');



    

    
    