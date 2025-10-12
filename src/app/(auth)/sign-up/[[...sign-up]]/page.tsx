import { SignUp } from '@clerk/nextjs';
const BG_URL ="https://res.cloudinary.com/dbdkg7fik/image/upload/v1760043843/Group_1430102940_1_eunn2m.png";

export default function Page() {
  return (
    <div 
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url('${BG_URL}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
        }}
      >
        {/* SignUp Card Container */}
        <div style={{ position: "relative", zIndex: 2, backdropFilter: "blur(50px)" }}>
          <SignUp />
        </div>
      </div>
  );
}
