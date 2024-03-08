import { BadRequestException } from '@nestjs/common';
enum TypeImage {
  jpg = 'image/jpg',
  jpeg = 'image/jpeg',
  png = 'image/png',
}
export const fileFilterImage = (req, file, cb) => {
  file.mimetype === TypeImage.jpg ||
  file.mimetype === TypeImage.jpeg ||
  file.mimetype === TypeImage.png
    ? cb(null, true)
    : cb(
        new BadRequestException(
          `${file.mimetype} not accepted - mimetype accept: image/jpg, image/jpeg, image/png`,
        ),
        false,
      );
};
