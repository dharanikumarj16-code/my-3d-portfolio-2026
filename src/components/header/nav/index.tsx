import { useState } from "react";
import { motion } from "framer-motion";
import Body from "./body/body";
import NavImage from "./image/image";
import { links } from "@/components/header/config";
import { cn } from "@/lib/utils";

interface IndexProps {
  setIsActive: (isActive: boolean) => void;
}

interface SelectedLinkState {
  isActive: boolean;
  index: number;
}

const Index: React.FC<IndexProps> = ({ setIsActive }) => {
  const [selectedLink, setSelectedLink] = useState<SelectedLinkState>({
    isActive: true,
    index: 0,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 py-4"
    >
      <div className="w-full lg:w-auto flex-1 flex justify-center lg:justify-start">
        <Body
          links={links}
          selectedLink={selectedLink}
          setSelectedLink={setSelectedLink}
          setIsActive={setIsActive}
        />
      </div>
      <NavImage
        item={links[selectedLink.index]}
        isActive={selectedLink.isActive}
      />
    </motion.div>
  );
};

export default Index;
