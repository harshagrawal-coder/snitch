import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreateProductForm } from "../component";
import { useProducts } from "../hook/useProducts";

const INITIAL_FORM = {
  title: "",
  description: "",
  price: "",
  currency: "INR",
};

function CreateProducts() {
  const { handleCreateProducts} = useProducts();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  }

  function validate() {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "Enter a valid price";
    if (!image) newErrors.image = "Please select an image";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("PriceAmount", form.price);
      formData.append("priceCurrency", form.currency);
      formData.append("images", image);
      await handleCreateProducts(formData);
      navigate("/");
    } catch {
      console.log("Product creation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2.5 mb-6"
        >
          <div className="w-8 h-8 rounded-lg bg-[#1E293B] flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-[#0F172A]">Snitch</span>
            <p className="text-[11px] text-[#64748B] -mt-0.5">Product Manager</p>
          </div>
        </motion.div>

        <CreateProductForm
          formData={form}
          onChange={handleChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          imagePreview={imagePreview}
          loading={loading}
          errors={errors}
        />
      </div>
    </div>
  );
}

export default CreateProducts;
