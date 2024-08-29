import axios from "axios";
import { API_URL } from "../services";
import { Design, DesignItem, DesignRequest, Image, ImageDelete, ImageRequest } from "../interfaces/design/design.interface";
import { getAuthorizationHeaders } from "../security/utils/authorization";

export const assets = async (): Promise<DesignItem[]> => {
  const response = await axios.get(API_URL + 'product/list/base/');
  return response.data;
};

export const assetById = async (father_id: string): Promise<DesignItem[]> => {
  const response = await axios.get(API_URL + 'product/list/by_father/'+ (+father_id) +'/');
  console.log(response);
  return response.data;
};

export const assetInfoById = async (id: string): Promise<DesignItem> => {
  const response = await axios.get(API_URL + 'product/info/'+ (+id) +'/');
  console.log(response,'detail');
  return response.data;
};

export const updateAsset = async (data: DesignRequest): Promise<Design> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.patch(API_URL + 'product/update/'+data.id+'/', data.design ,{ headers });
  return response.data;
};

export const createAsset = async (data: DesignRequest): Promise<Design> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.post(API_URL + 'product/create/', data.design ,{ headers });
  return response.data;
};

export const createAssetSubsection = async (data: DesignRequest): Promise<Design> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.post(API_URL + 'product/create/'+data.id+'/subsection/', data.design ,{ headers });
  return response.data;
};

export const deleteAsset = async (id: number): Promise<Design> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.delete(API_URL + 'product/delete/'+id+'/', { headers });
  return response.data;
}

export const AddImageToAsset = async (data: ImageRequest): Promise<Image[]> => {
  const headers = getAuthorizationHeaders();
  const formData = new FormData();
  data.images.forEach((image) => {
    formData.append('images', image);
  });
  const response = await axios.patch(API_URL + 'product/image/'+data.id+'/assign/', formData,{ headers });
  return response.data;
}

export const DeleteImageToAsset = async (data: ImageDelete): Promise<Image> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.delete(API_URL + 'product/'+ data.id_owner +'/image/order/'+ data.order +'/', { headers });
  return response.data;
}
