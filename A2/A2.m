%Part 1
    %Import images
    S1_im1 = imread('IMG_3435.JPEG');
    S1_im2 = imread('IMG_3436.JPEG');
    S2_im1 = imread('IMG_3422.JPEG');
    S2_im2 = imread('IMG_3423.JPEG');
    S2_im3 = imread('IMG_3424.JPEG');
    S2_im4 = imread('IMG_3425.JPEG');
    S3_im1 = imread('IMG_3418.JPEG');
    S3_im2 = imread('IMG_3419.JPEG');
    S3_im3 = imread('IMG_3420.JPEG');
    S3_im4 = imread('IMG_3421.JPEG');
    S4_im1 = imread('IMG_3429.JPEG');
    S4_im2 = imread('IMG_3430.JPEG');
    %Put images in an array
    allImArr = {S1_im1, S1_im2, S2_im1, S2_im2, S2_im3, S2_im4, S3_im1, S3_im2, S3_im3, S3_im4, S4_im1, S4_im2};
    
    %Resize images
    for i=1:length(allImArr)
        [x, y, ~] = size(allImArr{i});
        if x > y
            scale = 750/x;
        else
            scale = 750/y;
        end
        allImArr{i} = imresize(allImArr{i}, scale);
    end
    %Save Images
    imwrite(allImArr{1}, 'S1-im1.png');
    imwrite(allImArr{2}, 'S1-im2.png');
    imwrite(allImArr{3}, 'S2-im1.png');
    imwrite(allImArr{4}, 'S2-im2.png');
    imwrite(allImArr{5}, 'S2-im3.png');
    imwrite(allImArr{6}, 'S2-im4.png');
    imwrite(allImArr{7}, 'S3-im1.png');
    imwrite(allImArr{8}, 'S3-im2.png');
    imwrite(allImArr{9}, 'S3-im3.png');
    imwrite(allImArr{10}, 'S3-im4.png');
    imwrite(allImArr{11}, 'S4-im1.png');
    imwrite(allImArr{12}, 'S4-im2.png');
    %Re-set image variables to update changes
    S1_im1 = allImArr{1};
    S1_im2 = allImArr{2};
    S2_im1 = allImArr{3};
    S2_im2 = allImArr{4};
    S2_im3 = allImArr{5};
    S2_im4 = allImArr{6};
    S3_im1 = allImArr{7};
    S3_im2 = allImArr{8};
    S3_im3 = allImArr{9};
    S3_im4 = allImArr{10};
    S4_im1 = allImArr{11};
    S4_im2 = allImArr{12};
    %re-set images in array
    allImArr = {S1_im1, S1_im2, S2_im1, S2_im2, S2_im3, S2_im4, S3_im1, S3_im2, S3_im3, S3_im4, S4_im1, S4_im2};
    %Set all these images to doubles
    for i=1:length(allImArr)
        allImArr{i} = im2double(allImArr{i});
    end

%Part 2
close all
%     [~,a]=my_fast_detector(allImArr{1}, 10/255, 5/255, 12);
%     [~,b]=my_fast_detector(allImArr{3}, 10/255, 5/255, 12);
%     [~,c]=my_fast_detector(allImArr{7}, 10/255, 5/255, 12);
%     [~,d]=my_fast_detector(allImArr{11}, 25/255, 5/255, 12);
%     imshow(a);
%     figure;
%     imshow(b);
%     figure;
%     imshow(c);
%     figure;
%     imshow(d);
    %Create an array of fast image outputs
    FASTarr = {12};
    VISarr = {12};
    timesFAST=zeros(12,1); % Vector of timing data for FAST
    %compute fast
    tic;
    [FASTarr{1}, VISarr{1}] = my_fast_detector(allImArr{1}, 10/255, 5/255, 12);
    timesFAST(1)=toc;
    tic;
    [FASTarr{2}, VISarr{2}] = my_fast_detector(allImArr{2}, 10/255, 5/255, 12);
    timesFAST(2)=toc;
    
    tic;
    [FASTarr{3}, VISarr{3}] = my_fast_detector(allImArr{3},10/255, 5/255, 12);
    timesFAST(3)=toc;
    tic;
    [FASTarr{4}, VISarr{4}] = my_fast_detector(allImArr{4}, 10/255, 5/255, 12);
    timesFAST(4)=toc;
    tic;
    [FASTarr{5}, VISarr{5}] = my_fast_detector(allImArr{5}, 10/255, 5/255, 12);
    timesFAST(5)=toc;
    tic;
    [FASTarr{6}, VISarr{6}] = my_fast_detector(allImArr{6}, 10/255, 5/255, 12);
    timesFAST(6)=toc;

    tic;
    [FASTarr{7}, VISarr{7}] = my_fast_detector(allImArr{7}, 10/255, 5/255, 12);
    timesFAST(7)=toc;
    tic;
    [FASTarr{8}, VISarr{8}] = my_fast_detector(allImArr{8}, 10/255, 5/255, 12);
    timesFAST(8)=toc;
    tic;
    [FASTarr{9}, VISarr{9}] = my_fast_detector(allImArr{9}, 10/255, 5/255, 12);
    timesFAST(9)=toc;
    tic;
    [FASTarr{10}, VISarr{10}] = my_fast_detector(allImArr{10}, 10/255, 5/255, 12);
    timesFAST(10)=toc;

    tic;
    [FASTarr{11}, VISarr{11}] = my_fast_detector(allImArr{11}, 25/255, 5/255, 12);
    timesFAST(11)=toc;
    tic;
    [FASTarr{12}, VISarr{12}] = my_fast_detector(allImArr{12}, 25/255, 5/255, 12);
    timesFAST(12)=toc;

    %Calculate mean runtime
    meanFASTtime = mean(timesFAST);
    disp("Average runtime for FAST = "+meanFASTtime+" seconds");

    %Save the visualization of first images in image set 1 and image set 2
    imwrite(VISarr{1}, 'S1-fast.png');
    imwrite(VISarr{3}, 'S2-fast.png');

%Part 3
    %Computing kernels
        sobel = [-1 0 1; -2 0 2; -1 0 1];
        gaus = fspecial('gaussian', 5, 1);
        dog = conv2(gaus, sobel);
        timesFASTR=zeros(12,1); % Vector of timing data for FASTR
        timesHARRIS=zeros(12,1); % Vector of timing data for harris
    %Our array of FASTR images
        FASTRarr = {12};
    %Our array of FASTR visualizations
        FASTRarrVIS = {12};
    %compute harris for all fast images
    for i=1:length(FASTarr)
        tic;
        %Our harris threshold
            threshold = 0.001;
        %Compute derivative of all fast images
            ix = imfilter(FASTarr{i}, dog);
            iy = imfilter(FASTarr{i}, dog');
        %Compute square of derivatives
            ix2g = imfilter(ix .* ix, gaus);
            iy2g = imfilter(iy .* iy, gaus);
            ixiyg = imfilter(ix .* iy, gaus);
        %Compute cornerness function
            harcor = ix2g .*iy2g - ixiyg .* ixiyg - 0.05 * (ix2g + iy2g).^2;
        %Non-maxima suppression
            localmax = imdilate(harcor, ones(3));
            corners = ((harcor == localmax) .* (harcor > threshold));
        %Green Visual
            [lenX, lenY, ~] = size(allImArr{i});
            grayImage = rgb2gray(allImArr{i});
            visual = repmat(grayImage, [1 1 3]);
            for y=4:lenY-3
                for x=4:lenX-3
                    if corners(x, y) ~= 0 
                        visual(x, y, :) = [0, 255, 0];
                    end
                end
            end
            FASTRarr{i} = corners;
            FASTRarrVIS{i} = visual;
        timesHARRIS(i)=toc;
    end

    %Calculate mean runtime difference
    meanHARRIStime = mean(timesHARRIS);
    disp("Mean difference in runtime between FAST and FASTR = "+meanHARRIStime+" seconds");
    
    %Calclate mean FASTR runtime
    for i=1:length(allImArr)
        timesFASTR(i)=timesHARRIS(i)+timesFAST(i);
    end
    meanFASTRtime = mean(timesFASTR);
    disp("Mean runtime of FASTR = "+meanFASTRtime+" seconds");

    %Save the FASTR visualizaitons for S1_im1 and S2_im2
    imwrite(FASTRarrVIS{1}, 'S1-fastR.png');
    imwrite(FASTRarrVIS{3}, 'S2-fastR.png');

%Part 4
    %For each image
    for i=1:length(allImArr)
        %We will need to store our FAST & FASTR points in an Mx2 matrix
        FASTmatrix = [];
        FASTRmatrix = [];
        [lenX, lenY, ~] = size(allImArr{i});
        for y=1:lenY
            for x=1:lenX
                if FASTarr{i}(x, y) ~= 0 
                    FASTmatrix=[FASTmatrix;x y];
                end
                if FASTRarr{i}(x, y) ~= 0 
                    FASTRmatrix=[FASTRmatrix;x y];
                end
            end
        end
        %extract the features for FAST and FASTR points
        [FASTfeatures{i}, validFASTpoints{i}] = extractFeatures(rgb2gray(allImArr{i}), FASTmatrix, Method="FREAK");
        [FASTRfeatures{i}, validFASTRpoints{i}] = extractFeatures(rgb2gray(allImArr{i}), FASTRmatrix, Method="FREAK");
    end
    %match features between first 2 images in each set for FAST
        FASTindexPairsS1 = matchFeatures(FASTfeatures{1}, FASTfeatures{2});
        FASTindexPairsS2 = matchFeatures(FASTfeatures{3}, FASTfeatures{4});
        FASTindexPairsS3 = matchFeatures(FASTfeatures{7}, FASTfeatures{8});
        FASTindexPairsS4 = matchFeatures(FASTfeatures{11}, FASTfeatures{12});
    
        FASTRindexPairsS1 = matchFeatures(FASTRfeatures{1}, FASTRfeatures{2});
        FASTRindexPairsS2 = matchFeatures(FASTRfeatures{3}, FASTRfeatures{4});
        FASTRindexPairsS3 = matchFeatures(FASTRfeatures{7}, FASTRfeatures{8});
        FASTRindexPairsS4 = matchFeatures(FASTRfeatures{11}, FASTRfeatures{12});
    %Retrieve locations of the corresponding points for each image
    %FAST
        S1matchedPoints1 = validFASTpoints{1}(FASTindexPairsS1(:,1),:);
        S1matchedPoints2 = validFASTpoints{2}(FASTindexPairsS1(:,2),:);

        S2matchedPoints1 = validFASTpoints{3}(FASTindexPairsS2(:,1),:);
        S2matchedPoints2 = validFASTpoints{4}(FASTindexPairsS2(:,2),:);

        S3matchedPoints1 = validFASTpoints{7}(FASTindexPairsS3(:,1),:);
        S3matchedPoints2 = validFASTpoints{8}(FASTindexPairsS3(:,2),:);

        S4matchedPoints1 = validFASTpoints{11}(FASTindexPairsS4(:,1),:);
        S4matchedPoints2 = validFASTpoints{12}(FASTindexPairsS4(:,2),:);
    %FASTR
        S1matchedPoints1R = validFASTRpoints{1}(FASTRindexPairsS1(:,1),:);
        S1matchedPoints2R = validFASTRpoints{2}(FASTRindexPairsS1(:,2),:);

        S2matchedPoints1R = validFASTRpoints{3}(FASTRindexPairsS2(:,1),:);
        S2matchedPoints2R = validFASTpoints{4}(FASTRindexPairsS2(:,2),:);

        S3matchedPoints1R = validFASTRpoints{7}(FASTRindexPairsS3(:,1),:);
        S3matchedPoints2R = validFASTRpoints{8}(FASTRindexPairsS3(:,2),:);

        S4matchedPoints1R = validFASTRpoints{11}(FASTRindexPairsS4(:,1),:);
        S4matchedPoints2R = validFASTRpoints{12}(FASTRindexPairsS4(:,2),:);
    %Save the visualizations of the corresponding points
        close all
        showMatchedFeatures(rgb2gray(allImArr{1}),rgb2gray(allImArr{2}),S1matchedPoints1,S1matchedPoints2,"montag",Parent=axes);
        figure;
        showMatchedFeatures(rgb2gray(allImArr{1}),rgb2gray(allImArr{2}),S1matchedPoints1R,S1matchedPoints2R, "montag",Parent=axes);
        figure;
        showMatchedFeatures(rgb2gray(allImArr{3}),rgb2gray(allImArr{4}),S2matchedPoints1,S2matchedPoints2,"montag",Parent=axes);
        figure;
        showMatchedFeatures(rgb2gray(allImArr{3}),rgb2gray(allImArr{4}),S2matchedPoints1R,S2matchedPoints2R,"montag",Parent=axes);

%Define our function
function [corners, visual] = my_fast_detector(image, thresholdDetect, thresholdMaxima, N)
    %Detect corners
        [lenX, lenY, ~] = size(image);
        grayImage = rgb2gray(image);
        corners = 0*grayImage;
        %Iterate through all the pixels that can form a proper radius 3 circle
        for y=4:lenY-3
            for x=4:lenX-3
                %get pixel intensity
                p = grayImage(x, y);
                %Create our 16 pixel intensity cirlce of radius 3
                circle = {16};
                circle{1} = grayImage(x, y-3);
                circle{2} = grayImage(x+1, y-3);
                circle{3} = grayImage(x+2, y-2);
                circle{4} = grayImage(x+3, y-1);
                circle{5} = grayImage(x+3, y);
                circle{6} = grayImage(x+3, y+1);
                circle{7} = grayImage(x+2, y+2);
                circle{8} = grayImage(x+1, y+3);
                circle{9} = grayImage(x, y+3);
                circle{10} = grayImage(x-1, y+3);
                circle{11} = grayImage(x-2, y+2);
                circle{12} = grayImage(x-3, y+1);
                circle{13} = grayImage(x-3, y);
                circle{14} = grayImage(x-3, y-1);
                circle{15} = grayImage(x-2, y-2);
                circle{16} = grayImage(x-1, y-3);
                %High Speed test
                    %Check pixels 1&9, skip pixel if fails
                    if (p-thresholdDetect <= circle{1} || circle{1} <= p +thresholdDetect) && (p-thresholdDetect <= circle{9} || circle{9} <= p +thresholdDetect)
                        %Otherwise check 1, 9, 5, & 13
                        counter=0;
                        if (p-thresholdDetect <= circle{1} || circle{1} <= p +thresholdDetect)
                            counter=counter+1;
                        end
                        if (p-thresholdDetect <= circle{9} || circle{9} <= p +thresholdDetect) 
                            counter=counter+1;
                        end
                        if (p-thresholdDetect <= circle{5} || circle{5} <= p +thresholdDetect)
                            counter=counter+1;
                        end
                        if (p-thresholdDetect <= circle{13} || circle{13} <= p +thresholdDetect)
                            counter=counter+1;
                        end
                        %if < 3 pixels pass, skip pixel
                        if counter >= 3
                            %Check condition 1
                            count1 = 0;
                            for i=1:16
                                if circle{i} > p + thresholdDetect
                                    count1 = count1 + 1;
                                end
                            end
                            %Check condition 2
                            count2 = 0;
                            for i=1:16
                                if circle{i} < p - thresholdDetect
                                    count2 = count2 + 1;
                                end
                            end
                            %Check if either condition is met, and if so add the
                            %detected corner
                            if count1>=N || count2>=N
                                corners(x, y, :) = p;
                            end
                        end
                    end
            end
        end
    %Non-maximal suppression
        localmax = imdilate(corners, ones(3));
        corners = ((corners == localmax) .* (corners > thresholdMaxima));
    %Green Visual
        visual = repmat(grayImage, [1 1 3]);
        for y=4:lenY-3
            for x=4:lenX-3
                if corners(x, y) ~= 0 
                    visual(x, y, :) = [0, 255, 0];
                end
            end
        end
    end


    
