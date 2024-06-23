import { useEffect } from "react";

function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { hatch } = await import("ldrs");
      hatch.register();
    }
    getLoader();
  }, []);

  return <l-hatch color="gray" />;
}

export default Loader;
