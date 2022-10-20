import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function Qrcode({ url }) {
  const [src, setSrc] = useState(" ");

  useEffect(() => {
    QRCode.toDataURL(url).then((data) => {
      setSrc(data);
    });
  }, [url]);
  return (
    <>
      <div>
        <img src={src} alt="qrcode" />
      </div>
    </>
  );
}
