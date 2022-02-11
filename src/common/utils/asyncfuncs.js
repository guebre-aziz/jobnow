import adzunaApi from "../axios/adzunaApi";

export const fetchJobs = async (queryKey) => {
  console.log(queryKey);
  const res = await adzunaApi.get(
    `/jobs/${queryKey.country}/search/${queryKey.page}`,
    {
      params: queryKey.params,
    }
  );
  return res.data;
};

// fetch categories

export const fetchCategories = async (queryKey) => {
  console.log(queryKey);
  const res = await adzunaApi.get(`/jobs/${queryKey.country}/categories`, {
    params: queryKey.params,
  });
  return res.data;
};
