export const apiPath = "https://localhost:7220/api";

const fetchApi = async (url = "", data = {}, method: string) => {
  const response = await fetch(url, {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.ok;
};

export const postData = async (url = "", data = {}) => {
  return fetchApi(url, data, "POST");
};

export const putData = async (url = "", data = {}) => {
  return fetchApi(url, data, "PUT");
};

export const deleteData = async (url = "", data = {}) => {
  return fetchApi(url, data, "DELETE");
};

export const fetchSensors = async () => {
  const response = await fetch(`${apiPath}/Sensor/GetSensors`);
  const sensors = await response.json();

  return sensors;
};

export const fetchSensor = async (sensorId: number) => {
  const response = await fetch(
    `${apiPath}/Sensor/GetSensor?sensorId=${sensorId}`,
  );
  const sensor = await response.json();

  return sensor;
};

export const fetchMeasurements = async () => {
  const response = await fetch(`${apiPath}/Measurement/GetMeasurements`);
  const measurements = await response.json();

  return measurements;
};
