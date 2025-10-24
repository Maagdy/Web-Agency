import { motion } from "framer-motion";
import type { ClientCardProps } from "../../common/constants/constants.types";

export const ClientCard: React.FC<ClientCardProps> = ({ id, image }) => {
  return (
    <motion.div
      id={id.toString()}
      className="flex sm:w-[250px] w-[90%] shadow-2xl shadow-black/30 flex-col items-center bg-white rounded-lg p-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.5 }}
      whileHover={{
        opacity: 1,
        y: -20,
        boxShadow:
          "0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <img
        src={image}
        alt={`client's avatar`}
        loading="lazy"
        className="w-full h-24 rounded-full mb-4 object-contain"
      />
    </motion.div>
  );
};
