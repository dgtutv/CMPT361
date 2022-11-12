%%this script is by _Evan#6134 on discord and I have his full consent to
%%use it
A=im2double(imread("image.jpeg"));
R= A(:,:,1);
G = A(:,:,2);
B = A(:,:,3);
fileID = fopen('output.txt', 'w');
formatSpec = '\"v,%d,%d,%4.1f,%4.1f,%4.1f;l,%d,%d;\",\n';

count = 0;
for y = 1:size(A,1)
    for x = 1:size(A,1)
        fprintf(fileID, formatSpec, x, y, R(y, x), G(y, x), B(y, x), count, count);
        count = count + 1;
    end
end
fclose(fileID);