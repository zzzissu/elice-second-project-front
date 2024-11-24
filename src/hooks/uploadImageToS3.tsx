import { BASE_URL } from "../config/config";
import { getAxios, postAxios, putAxios } from "../utils/axios";
const getPresignedUrl = async () => {
  try {
    const response = await getAxios(`${BASE_URL}/upload/product`);
    console.log("Presigned URL Response:", response.data);

    if (response.data) {
      return response.data;
    }
    throw new Error("Presigned URL not found in response.");
  } catch (error) {
    console.error("😭 Failed to fetch presigned URL: ", error);
    throw error;
  }
};

const uploadImageToS3 = async (file: File, type: string) => {
  try {
    const fileName = file.name;
    const fileType = file.type;

    // Presigned URL 가져오기
    const presignedUrl = await getPresignedUrl();

    // Presigned URL로 파일 업로드
    if (type === "addproduct") {
      await postAxios(
        presignedUrl,
        {
          fileName,
          fileType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
    if (type === "editproduct") {
      await putAxios(
        presignedUrl,
        {
          fileName,
          fileType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
    console.log(file);
    console.log("✅ File uploaded successfully: ", presignedUrl);
  } catch (error) {
    console.error("😭 Image upload failed: ", error);
    throw new Error("Image upload failed");
  }
};

export default uploadImageToS3;
