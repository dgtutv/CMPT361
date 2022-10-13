%Part 1
    %Import images
    S1_im1 = imread('IMG_3356.jpeg');
    S1_im2 = imread('IMG_3357.jpeg');
    S2_im1 = imread('IMG_3390.jpeg');
    S2_im2 = imread('IMG_3391.jpeg');
    S2_im3 = imread('IMG_3392.jpeg');
    S2_im4 = imread('IMG_3393.jpeg');
    S3_im1 = imread('IMG_3379.jpeg');
    S3_im2 = imread('IMG_3380.jpeg');
    S3_im3 = imread('IMG_3381.jpeg');
    S3_im4 = imread('IMG_3384.jpeg');
    S4_im1 = imread('IMG_3362.jpeg');
    S4_im2 = imread('IMG_3363.jpeg');
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
    %Create an array of fast image outputs
    FASTarr = {12};
    VISarr = {12};
    timesFAST=zeros(12,1); % Vector of timing data for FAST
    %compute fast
    tic;
    [FASTarr{1}, VISarr{1}] = my_fast_detector(allImArr{1}, 5/255, 1/255, 12);
    timesFAST(1)=toc;
    tic;
    [FASTarr{2}, VISarr{2}] = my_fast_detector(allImArr{2}, 5/255, 1/255, 12);
    timesFAST(2)=toc;
    
    tic;
    [FASTarr{3}, VISarr{3}] = my_fast_detector(allImArr{3}, 8/255, 45/255, 12);
    timesFAST(3)=toc;
    tic;
    [FASTarr{4}, VISarr{4}] = my_fast_detector(allImArr{4}, 8/255, 45/255, 12);
    timesFAST(4)=toc;
    tic;
    [FASTarr{5}, VISarr{5}] = my_fast_detector(allImArr{5}, 8/255, 45/255, 12);
    timesFAST(5)=toc;
    tic;
    [FASTarr{6}, VISarr{6}] = my_fast_detector(allImArr{6}, 8/255, 45/255, 12);
    timesFAST(6)=toc;

    tic;
    [FASTarr{7}, VISarr{3}] = my_fast_detector(allImArr{7}, 16/255, 8/255, 12);
    timesFAST(7)=toc;
    tic;
    [FASTarr{8}, VISarr{4}] = my_fast_detector(allImArr{8}, 16/255, 8/255, 12);
    timesFAST(8)=toc;
    tic;
    [FASTarr{9}, VISarr{5}] = my_fast_detector(allImArr{9}, 16/255, 8/255, 12);
    timesFAST(9)=toc;
    tic;
    [FASTarr{10}, VISarr{6}] = my_fast_detector(allImArr{10}, 16/255, 8/255, 12);
    timesFAST(10)=toc;

    tic;
    [FASTarr{11}, VISarr{5}] = my_fast_detector(allImArr{11}, 18/255, 10/255, 12);
    timesFAST(11)=toc;
    tic;
    [FASTarr{12}, VISarr{6}] = my_fast_detector(allImArr{12}, 18/255, 10/255, 12);
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
            iy2g = imfilter(iy .* ix, gaus);
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


    
