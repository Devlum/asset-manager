import axios from "axios";
import { API_URL } from "../services";
//import { getAuthorizationHeaders } from "../security/utils/authorization";
import { Design, DesignItem, DesignRequest, Image, ImageDelete, ImageRequest } from "../interfaces/design/design.interface";
import { getAuthorizationHeaders } from "../security/utils/authorization";

export const assets = async (): Promise<DesignItem[]> => {
  const response = await axios.get(API_URL + 'asset/list/base/');
  return response.data;
};

export const assetById = async (father_id: string): Promise<DesignItem[]> => {
  const response = await axios.get(API_URL + 'asset/list/by_father/'+ (+father_id) +'/');
  return response.data;
};

export const assetInfoById = async (id: string): Promise<DesignItem> => {
  const response = await axios.get(API_URL + 'asset/info/'+ (+id) +'/');
  return response.data;
};

export const updateAsset = async (data: DesignRequest): Promise<Design> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.patch(API_URL + 'asset/update/'+data.id+'/', data.design ,{ headers });
  return response.data;
};

export const createAsset = async (data: DesignRequest): Promise<Design> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.post(API_URL + 'asset/create/', data.design ,{ headers });
  return response.data;
};

export const createAssetSubsection = async (data: DesignRequest): Promise<Design> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.post(API_URL + 'asset/create/'+data.id+'/subsection/', data.design ,{ headers });
  return response.data;
};

export const deleteAsset = async (id: number): Promise<Design> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.delete(API_URL + 'asset/delete/'+id+'/', { headers });
  return response.data;
}

export const AddImageToAsset = async (data: ImageRequest): Promise<Image[]> => {
  const headers = getAuthorizationHeaders();
  const formData = new FormData();
  data.images.forEach((image) => {
    formData.append('images', image);
  });
  const response = await axios.patch(API_URL + 'asset/image/'+data.id+'/assign/', formData,{ headers });
  return response.data;
}

export const DeleteImageToAsset = async (data: ImageDelete): Promise<Image> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.delete(API_URL + 'asset/'+ data.id_owner +'/image/order/'+ data.order +'/', { headers });
  return response.data;
}
// asset/create/1/subsection/
