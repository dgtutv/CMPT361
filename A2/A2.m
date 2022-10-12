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
%Part 2
    %Save the visualization of first images in image set 1 and image set 2
    imwrite(my_fast_detector(S1_im1, 5, 1, 12), 'S1-fast.png');
    imwrite(my_fast_detector(S2_im1, 10, 10, 12), 'S2-fast.png');
    %Define our function
    function corners = my_fast_detector(image, thresholdDetect, thresholdMaxima, N)
        %Detect corners
            [lenX, lenY, ~] = size(image);
            grayImage = rgb2gray(image);
            corners = 0*image;
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
        %Non-maximal suppression
            localmax = imdilate(corners, ones(3));
            corners = ((corners == localmax) .* (corners > thresholdMaxima));
    end
    %-------------------------------
    %NEED TO ADD THE HIGH SPEED TEST
    %-------------------------------

    
