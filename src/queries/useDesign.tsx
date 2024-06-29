import { useMutation, useQuery } from "@tanstack/react-query";
import { AddImageToAsset, DeleteImageToAsset, assetById, assetInfoById, assets, createAsset, createAssetSubsection, deleteAsset, updateAsset } from "../api/asset";
import { useNotification } from "../hooks/useNotification";
import { DesignRequest, ImageDelete, ImageRequest } from "../interfaces/design/design.interface";

export const useAssets = () => {
    const info = useQuery({
        queryKey: ['Assets'],
        queryFn: () => assets(),
      });
    return info;
}

export const useAssetById = (father_id: string) => {
    const info = useQuery({
        queryKey: ['asset', father_id],
        queryFn: () => assetById(father_id),
      });
    return info;
}

export const useAssetInfoById = (id: string) => {
  const info = useQuery({
      queryKey: ['asset_detail', id],
      queryFn: () => assetInfoById(id),
    });
  return info;
}

export const useUpdateAsset = () => {
  const {getSuccess} = useNotification();
  const info = useMutation({
      mutationFn:(data: DesignRequest) => updateAsset(data),
      onSuccess: () => {
              getSuccess('Asset updated successfully');
          }
      });
  return info;
}

export const useCreateAsset = () => {
  const {getSuccess} = useNotification();
  const info = useMutation({
      mutationFn:(data: DesignRequest) => createAssetSubsection(data),
      onSuccess: () => {
              getSuccess('Asset created successfully');
          }
      });
  return info;
}

export const useCreateBaseAsset = () => {
  const {getSuccess} = useNotification();
  const info = useMutation({
      mutationFn:(data: DesignRequest) => createAsset(data),
      onSuccess: () => {
              getSuccess('Asset created successfully');
          }
      });
  return info;
}


export const useDeleteAsset = () => {
  const {getSuccess} = useNotification();
  const info = useMutation({
      mutationFn:(id: number) => deleteAsset(id),
      onSuccess: () => {
              getSuccess('Asset deleted successfully');
          }
      });
  return info;
}

export const useAddImageToAsset = () => {
  const {getSuccess} = useNotification();
  const info = useMutation({
      mutationFn:(data: ImageRequest) => AddImageToAsset(data),
      onSuccess: () => {
              getSuccess('Asset deleted successfully');
          }
      });
  return info;
}

export const useDeleteImageToAsset = () => {
  const {getSuccess} = useNotification();
  const info = useMutation({
      mutationFn:(data: ImageDelete) => DeleteImageToAsset(data),
      onSuccess: () => {
              getSuccess('Asset deleted successfully');
          }
      });
  return info;
}