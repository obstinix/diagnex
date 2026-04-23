export async function getNearestHospitalUrl(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      resolve('https://www.google.com/maps/search/hospitals+near+me');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve(`https://www.google.com/maps/search/hospitals/@${latitude},${longitude},13z`);
      },
      (error) => {
        console.error('Geolocation error', error);
        resolve('https://www.google.com/maps/search/hospitals+near+me');
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
}
