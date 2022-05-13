import cv2
import numpy as np
#for n in range(5):
#    img = cv2.imread(str(n)+'.png',cv2.IMREAD_UNCHANGED)
#    img = cv2.resize(img,(100,100),interpolation=cv2.INTER_AREA)
#    cv2.imwrite('text'+str(n)+'.png',img)
#    cv2.waitKey(1)

img = cv2.imread('mark.png',cv2.IMREAD_UNCHANGED)
img = cv2.resize(img,(40,40),interpolation=cv2.INTER_AREA)
cv2.imwrite('s_mark.png',img)
cv2.waitKey(1)