import React, { useContext } from "react";
import { AuthContext } from "../_app";
import { CategoryService } from "@/services/Category.service";
import { CollectionService } from "@/services/Collection.service";
import { ProductService } from "@/services/Product.service";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminPage = () => {
  return <AdminLayout></AdminLayout>;
};

export default AdminPage;
