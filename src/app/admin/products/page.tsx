"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Edit3,
  Eye,
  Package,
  Plus,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/services/api";
import styles from "./Products.module.css";

type Locale = "ar" | "en";

type LocalizedText = {
  ar: string;
  en: string;
};

type ProductMedia = {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  alt?: LocalizedText;
  sortOrder?: number;
};

type ProductColor = {
  _id?: string;
  name: LocalizedText;
  hex: string;
  stock: number;
  serialNumber: string;
  media: ProductMedia[];
};

type ProductSpecification = {
  label: LocalizedText;
  value: LocalizedText;
};

type Product = {
  _id: string;
  name: LocalizedText;
  description: LocalizedText;
  slug: string;
  category: string;
  price: number;
  oldPrice: number | null;
  serialNumber?: string;
  media: ProductMedia[];
  colors: ProductColor[];
  stock: number;
  specifications: ProductSpecification[];
  featured: boolean;
  badge: LocalizedText;
  rating: number;
  reviewsCount: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type ProductForm = {
  name: LocalizedText;
  description: LocalizedText;
  slug: string;
  category: string;
  price: string;
  oldPrice: string;
  serialNumber: string;
  stock: string;
  featured: boolean;
  active: boolean;
  badge: LocalizedText;
};

const categories = [
  {
    value: "computer-desks",
    ar: "مكاتب وطاولات كمبيوتر",
    en: "Computer Desks & Tables",
  },
  {
    value: "chairs",
    ar: "كراسي",
    en: "Chairs",
  },
  {
    value: "office-sofas",
    ar: "انتريهات مكتبية",
    en: "Office Sofas",
  },
  {
    value: "work-cells",
    ar: "خلايا العمل",
    en: "Work Cells",
  },
  {
    value: "reception-counters",
    ar: "كاونتر استقبال",
    en: "Reception Counters",
  },
  {
    value: "meeting-tables",
    ar: "ترابيزات اجتماعات",
    en: "Meeting Tables",
  },
  {
    value: "office-accessories",
    ar: "اكسسوارات الاثاث المكتبي",
    en: "Office Furniture Accessories",
  },
];

const emptyForm: ProductForm = {
  name: {
    ar: "",
    en: "",
  },
  description: {
    ar: "",
    en: "",
  },
  slug: "",
  category: "",
  price: "",
  oldPrice: "",
  serialNumber: "",
  stock: "0",
  featured: false,
  active: true,
  badge: {
    ar: "",
    en: "",
  },
};

export default function ProductsPage() {
  const [locale, setLocale] = useState<Locale>("ar");

  const [products, setProducts] = useState<Product[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("");
  const [statusFilter, setStatusFilter] =
    useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<Product | null>(null);

  const [form, setForm] =
    useState<ProductForm>(emptyForm);

  useEffect(() => {
    const path =
      window.location.pathname
        .split("/")
        .filter(Boolean);

    setLocale(
      path[0] === "en" ? "en" : "ar"
    );
  }, []);

  const isArabic = locale === "ar";

  const text = {
    title: isArabic
      ? "المنتجات"
      : "Products",

    subtitle: isArabic
      ? "إدارة منتجات المتجر وإضافة وتعديل وحذف المنتجات"
      : "Manage store products, add, edit and delete products",

    addProduct: isArabic
      ? "إضافة منتج"
      : "Add Product",

    search: isArabic
      ? "ابحث عن منتج..."
      : "Search products...",

    allCategories: isArabic
      ? "جميع التصنيفات"
      : "All Categories",

    allStatuses: isArabic
      ? "جميع الحالات"
      : "All Statuses",

    active: isArabic
      ? "نشط"
      : "Active",

    inactive: isArabic
      ? "غير نشط"
      : "Inactive",

    product: isArabic
      ? "المنتج"
      : "Product",

    category: isArabic
      ? "التصنيف"
      : "Category",

    price: isArabic
      ? "السعر"
      : "Price",

    stock: isArabic
      ? "المخزون"
      : "Stock",

    status: isArabic
      ? "الحالة"
      : "Status",

    featured: isArabic
      ? "مميز"
      : "Featured",

    actions: isArabic
      ? "الإجراءات"
      : "Actions",

    edit: isArabic
      ? "تعديل"
      : "Edit",

    delete: isArabic
      ? "حذف"
      : "Delete",

    view: isArabic
      ? "عرض"
      : "View",

    noProducts: isArabic
      ? "لا توجد منتجات"
      : "No Products",

    noProductsDescription: isArabic
      ? "لم تتم إضافة أي منتجات إلى المتجر حتى الآن."
      : "No products have been added to the store yet.",

    addFirstProduct: isArabic
      ? "إضافة أول منتج"
      : "Add First Product",

    addNewProduct: isArabic
      ? "إضافة منتج جديد"
      : "Add New Product",

    editProduct: isArabic
      ? "تعديل المنتج"
      : "Edit Product",

    nameArabic: isArabic
      ? "اسم المنتج بالعربية"
      : "Arabic Product Name",

    nameEnglish: isArabic
      ? "اسم المنتج بالإنجليزية"
      : "English Product Name",

    descriptionArabic: isArabic
      ? "الوصف بالعربية"
      : "Arabic Description",

    descriptionEnglish: isArabic
      ? "الوصف بالإنجليزية"
      : "English Description",

    slug: isArabic
      ? "الرابط المختصر"
      : "Slug",

    selectCategory: isArabic
      ? "اختر التصنيف"
      : "Select Category",

    priceLabel: isArabic
      ? "السعر"
      : "Price",

    oldPriceLabel: isArabic
      ? "السعر القديم"
      : "Old Price",

    serialNumber: isArabic
      ? "serialNumber"
      : "serialNumber",

    stockLabel: isArabic
      ? "المخزون"
      : "Stock",

    badgeArabic: isArabic
      ? "الشارة بالعربية"
      : "Arabic Badge",

    badgeEnglish: isArabic
      ? "الشارة بالإنجليزية"
      : "English Badge",

    featuredLabel: isArabic
      ? "منتج مميز"
      : "Featured Product",

    activeLabel: isArabic
      ? "المنتج نشط"
      : "Product Active",

    cancel: isArabic
      ? "إلغاء"
      : "Cancel",

    save: isArabic
      ? "حفظ المنتج"
      : "Save Product",

    update: isArabic
      ? "تحديث المنتج"
      : "Update Product",

    deleteTitle: isArabic
      ? "حذف المنتج"
      : "Delete Product",

    deleteDescription: isArabic
      ? "هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذه العملية."
      : "Are you sure you want to delete this product? This action cannot be undone.",

    confirmDelete: isArabic
      ? "نعم، حذف المنتج"
      : "Yes, Delete Product",

    loading: isArabic
      ? "جاري تحميل المنتجات..."
      : "Loading products...",

    saving: isArabic
      ? "جاري الحفظ..."
      : "Saving...",

    deleting: isArabic
      ? "جاري الحذف..."
      : "Deleting...",

    currency: isArabic
      ? "ج.م"
      : "EGP",

    reviews: isArabic
      ? "تقييم"
      : "reviews",

    required: isArabic
      ? "هذا الحقل مطلوب"
      : "This field is required",
  };

  const categoryName = (
    category: string
  ) => {
    const item = categories.find(
      (categoryItem) =>
        categoryItem.value === category
    );

    if (!item) {
      return category || "-";
    }

    return isArabic
      ? item.ar
      : item.en;
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue =
        search.trim().toLowerCase();

      const productName = (
        product.name?.[locale] ||
        product.name?.ar ||
        product.name?.en ||
        ""
      ).toLowerCase();

      const productserialNumber = (
        product.serialNumber || ""
      ).toLowerCase();

      const matchesSearch =
        !searchValue ||
        productName.includes(searchValue) ||
        productserialNumber.includes(searchValue);

      const matchesCategory =
        !categoryFilter ||
        product.category === categoryFilter;

      const matchesStatus =
        !statusFilter ||
        (statusFilter === "active" &&
          product.active) ||
        (statusFilter === "inactive" &&
          !product.active);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    products,
    search,
    categoryFilter,
    statusFilter,
    locale,
  ]);

  const openCreateForm = () => {
    setEditingProduct(null);
    setForm({
      ...emptyForm,
      name: {
        ar: "",
        en: "",
      },
      description: {
        ar: "",
        en: "",
      },
      badge: {
        ar: "",
        en: "",
      },
    });
    setError("");
    setShowForm(true);
  };

  const openEditForm = (
    product: Product
  ) => {
    setEditingProduct(product);

    setForm({
      name: {
        ar: product.name?.ar || "",
        en: product.name?.en || "",
      },

      description: {
        ar:
          product.description?.ar || "",
        en:
          product.description?.en || "",
      },

      slug: product.slug || "",

      category:
        product.category || "",

      price:
        product.price !== undefined
          ? String(product.price)
          : "",

      oldPrice:
        product.oldPrice !== null &&
        product.oldPrice !== undefined
          ? String(product.oldPrice)
          : "",

      serialNumber: product.serialNumber || "",

      stock:
        product.stock !== undefined
          ? String(product.stock)
          : "0",

      featured:
        product.featured || false,

      active:
        product.active !== false,

      badge: {
        ar:
          product.badge?.ar || "",
        en:
          product.badge?.en || "",
      },
    });

    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) {
      return;
    }

    setShowForm(false);
    setEditingProduct(null);
    setForm(emptyForm);
  };

  const updateLocalizedField = (
    field:
      | "name"
      | "description"
      | "badge",
    language: "ar" | "en",
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: {
        ...current[field],
        [language]: value,
      },
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !form.name.ar.trim() &&
      !form.name.en.trim()
    ) {
      setError(text.required);
      return;
    }

    if (
      !form.description.ar.trim() &&
      !form.description.en.trim()
    ) {
      setError(text.required);
      return;
    }

    if (!form.slug.trim()) {
      setError(text.required);
      return;
    }

    if (!form.category) {
      setError(text.required);
      return;
    }

    if (!form.price) {
      setError(text.required);
      return;
    }

    const token =
      localStorage.getItem("token");

    if (!token) {
      setError(
        isArabic
          ? "لم يتم العثور على رمز تسجيل الدخول."
          : "Authentication token was not found."
      );
      return;
    }

    const productData = {
      name: form.name,
      description: form.description,
      slug: form.slug.trim(),
      category: form.category,
      price: Number(form.price),
      oldPrice: form.oldPrice
        ? Number(form.oldPrice)
        : null,
      serialNumber: form.serialNumber.trim(),
      stock: Number(form.stock) || 0,
      featured: form.featured,
      active: form.active,
      badge: form.badge,
      media: editingProduct?.media || [],
      colors: editingProduct?.colors || [],
      specifications:
        editingProduct?.specifications || [],
    };

    try {
      setSaving(true);
      setError("");

      if (editingProduct) {
        await updateProduct(
          token,
          editingProduct._id,
          productData
        );
      } else {
        await createProduct(
          token,
          productData
        );
      }

      await loadProducts();
      closeForm();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save product"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    const token =
      localStorage.getItem("token");

    if (!token) {
      setError(
        isArabic
          ? "لم يتم العثور على رمز تسجيل الدخول."
          : "Authentication token was not found."
      );
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteProduct(
        token,
        deleteTarget._id
      );

      setProducts((current) =>
        current.filter(
          (product) =>
            product._id !==
            deleteTarget._id
        )
      );

      setDeleteTarget(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete product"
      );
    } finally {
      setDeleting(false);
    }
  };

  const getProductImage = (
    product: Product
  ) => {
    const image = product.media?.find(
      (item) => item.type === "image"
    );

    return image?.url || "";
  };

  if (loading) {
    return (
      <main
        className={styles.page}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
          <p>{text.loading}</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className={styles.page}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <section className={styles.header}>
        <div className={styles.headerText}>
          <h1>{text.title}</h1>
          <p>{text.subtitle}</p>
        </div>

        <button
          type="button"
          className={styles.addButton}
          onClick={openCreateForm}
        >
          <Plus size={20} />
          <span>{text.addProduct}</span>
        </button>
      </section>

      {error && !showForm && (
        <div className={styles.errorBox}>
          {error}
        </div>
      )}

      {products.length > 0 && (
        <section className={styles.filters}>
          <div className={styles.searchBox}>
            <Search size={19} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder={text.search}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
              >
                <X size={17} />
              </button>
            )}
          </div>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value
              )
            }
          >
            <option value="">
              {text.allCategories}
            </option>

            {categories.map((category) => (
              <option
                key={category.value}
                value={category.value}
              >
                {isArabic
                  ? category.ar
                  : category.en}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
          >
            <option value="">
              {text.allStatuses}
            </option>

            <option value="active">
              {text.active}
            </option>

            <option value="inactive">
              {text.inactive}
            </option>
          </select>
        </section>
      )}

      {products.length === 0 ? (
        <section className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Package size={58} />
          </div>

          <h2>{text.noProducts}</h2>

          <p>
            {text.noProductsDescription}
          </p>

          <button
            type="button"
            className={styles.emptyButton}
            onClick={openCreateForm}
          >
            <Plus size={19} />
            {text.addFirstProduct}
          </button>
        </section>
      ) : filteredProducts.length === 0 ? (
        <section className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Search size={52} />
          </div>

          <h2>
            {isArabic
              ? "لا توجد نتائج"
              : "No Results"}
          </h2>

          <p>
            {isArabic
              ? "لم يتم العثور على منتجات تطابق البحث أو الفلاتر المحددة."
              : "No products match your search or selected filters."}
          </p>

          <button
            type="button"
            className={styles.emptyButton}
            onClick={() => {
              setSearch("");
              setCategoryFilter("");
              setStatusFilter("");
            }}
          >
            {isArabic
              ? "إزالة الفلاتر"
              : "Clear Filters"}
          </button>
        </section>
      ) : (
        <section className={styles.productsCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.productsTable}>
              <thead>
                <tr>
                  <th>{text.product}</th>
                  <th>{text.category}</th>
                  <th>{text.price}</th>
                  <th>{text.stock}</th>
                  <th>{text.status}</th>
                  <th>{text.featured}</th>
                  <th>{text.actions}</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map(
                  (product) => {
                    const image =
                      getProductImage(
                        product
                      );

                    const productName =
                      product.name?.[
                        locale
                      ] ||
                      product.name?.ar ||
                      product.name?.en ||
                      "-";

                    return (
                      <tr
                        key={product._id}
                      >
                        <td>
                          <div
                            className={
                              styles.productInfo
                            }
                          >
                            <div
                              className={
                                styles.productImage
                              }
                            >
                              {image ? (
                                <img
                                  src={image}
                                  alt={
                                    productName
                                  }
                                />
                              ) : (
                                <Package
                                  size={25}
                                />
                              )}
                            </div>

                            <div
                              className={
                                styles.productDetails
                              }
                            >
                              <strong>
                                {
                                  productName
                                }
                              </strong>

                              {product.serialNumber && (
                                <span>
                                  serialNumber:{" "}
                                  {
                                    product.serialNumber
                                  }
                                </span>
                              )}

                              <div
                                className={
                                  styles.rating
                                }
                              >
                                <Star
                                  size={14}
                                  fill="currentColor"
                                />

                                <span>
                                  {
                                    product.rating
                                  }
                                </span>

                                <small>
                                  (
                                  {
                                    product.reviewsCount
                                  }{" "}
                                  {
                                    text.reviews
                                  }
                                  )
                                </small>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className={
                              styles.categoryBadge
                            }
                          >
                            {categoryName(
                              product.category
                            )}
                          </span>
                        </td>

                        <td>
                          <div
                            className={
                              styles.priceCell
                            }
                          >
                            <strong>
                              {product.price.toLocaleString(
                                "en-US"
                              )}{" "}
                              {
                                text.currency
                              }
                            </strong>

                            {product.oldPrice && (
                              <del>
                                {product.oldPrice.toLocaleString(
                                  "en-US"
                                )}{" "}
                                {
                                  text.currency
                                }
                              </del>
                            )}
                          </div>
                        </td>

                        <td>
                          <span
                            className={
                              product.stock > 0
                                ? styles.stockAvailable
                                : styles.stockEmpty
                            }
                          >
                            {
                              product.stock
                            }
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              product.active
                                ? styles.statusActive
                                : styles.statusInactive
                            }
                          >
                            {product.active
                              ? text.active
                              : text.inactive}
                          </span>
                        </td>

                        <td>
                          {product.featured ? (
                            <span
                              className={
                                styles.featuredYes
                              }
                            >
                              <Star
                                size={15}
                                fill="currentColor"
                              />
                              {isArabic
                                ? "نعم"
                                : "Yes"}
                            </span>
                          ) : (
                            <span
                              className={
                                styles.featuredNo
                              }
                            >
                              {isArabic
                                ? "لا"
                                : "No"}
                            </span>
                          )}
                        </td>

                        <td>
                          <div
                            className={
                              styles.actions
                            }
                          >
                            <button
                              type="button"
                              title={text.view}
                              className={
                                styles.viewButton
                              }
                            >
                              <Eye
                                size={17}
                              />
                            </button>

                            <button
                              type="button"
                              title={text.edit}
                              className={
                                styles.editButton
                              }
                              onClick={() =>
                                openEditForm(
                                  product
                                )
                              }
                            >
                              <Edit3
                                size={17}
                              />
                            </button>

                            <button
                              type="button"
                              title={text.delete}
                              className={
                                styles.deleteButton
                              }
                              onClick={() =>
                                setDeleteTarget(
                                  product
                                )
                              }
                            >
                              <Trash2
                                size={17}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {showForm && (
        <div className={styles.modalOverlay}>
          <div
            className={styles.modal}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <div className={styles.modalHeader}>
              <div>
                <h2>
                  {editingProduct
                    ? text.editProduct
                    : text.addNewProduct}
                </h2>

                <p>
                  {isArabic
                    ? "أدخل بيانات المنتج الأساسية"
                    : "Enter the basic product information"}
                </p>
              </div>

              <button
                type="button"
                className={
                  styles.closeButton
                }
                onClick={closeForm}
                disabled={saving}
              >
                <X size={21} />
              </button>
            </div>

            <form
              className={styles.form}
              onSubmit={handleSubmit}
            >
              {error && (
                <div
                  className={
                    styles.formError
                  }
                >
                  {error}
                </div>
              )}

              <div
                className={
                  styles.formSection
                }
              >
                <h3>
                  {isArabic
                    ? "المعلومات الأساسية"
                    : "Basic Information"}
                </h3>

                <div
                  className={
                    styles.formGrid
                  }
                >
                  <div
                    className={
                      styles.field
                    }
                  >
                    <label>
                      {text.nameArabic}
                    </label>

                    <input
                      type="text"
                      value={
                        form.name.ar
                      }
                      onChange={(event) =>
                        updateLocalizedField(
                          "name",
                          "ar",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div
                    className={
                      styles.field
                    }
                  >
                    <label>
                      {text.nameEnglish}
                    </label>

                    <input
                      type="text"
                      value={
                        form.name.en
                      }
                      onChange={(event) =>
                        updateLocalizedField(
                          "name",
                          "en",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div
                    className={
                      styles.field
                    }
                  >
                    <label>
                      {text.slug}
                    </label>

                    <input
                      type="text"
                      value={form.slug}
                      onChange={(event) =>
                        setForm(
                          (current) => ({
                            ...current,
                            slug: event.target.value
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                "-"
                              ),
                          })
                        )
                      }
                    />
                  </div>

                  <div
                    className={
                      styles.field
                    }
                  >
                    <label>
                      {text.category}
                    </label>

                    <select
                      value={
                        form.category
                      }
                      onChange={(event) =>
                        setForm(
                          (current) => ({
                            ...current,
                            category:
                              event.target
                                .value,
                          })
                        )
                      }
                    >
                      <option value="">
                        {
                          text.selectCategory
                        }
                      </option>

                      {categories.map(
                        (category) => (
                          <option
                            key={
                              category.value
                            }
                            value={
                              category.value
                            }
                          >
                            {isArabic
                              ? category.ar
                              : category.en}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div
                    className={
                      styles.field
                    }
                  >
                    <label>
                      {text.priceLabel}
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        form.price
                      }
                      onChange={(event) =>
                        setForm(
                          (current) => ({
                            ...current,
                            price:
                              event.target
                                .value,
                          })
                        )
                      }
                    />
                  </div>

                  <div
                    className={
                      styles.field
                    }
                  >
                    <label>
                      {text.oldPriceLabel}
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        form.oldPrice
                      }
                      onChange={(event) =>
                        setForm(
                          (current) => ({
                            ...current,
                            oldPrice:
                              event.target
                                .value,
                          })
                        )
                      }
                    />
                  </div>

                  <div
                    className={
                      styles.field
                    }
                  >
                    <label>
                      {text.serialNumber}
                    </label>

                    <input
                      type="text"
                      value={form.serialNumber}
                      onChange={(event) =>
                        setForm(
                          (current) => ({
                            ...current,
                            serialNumber: event.target
                              .value,
                          })
                        )
                      }
                    />
                  </div>

                  <div
                    className={
                      styles.field
                    }
                  >
                    <label>
                      {text.stockLabel}
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        form.stock
                      }
                      onChange={(event) =>
                        setForm(
                          (current) => ({
                            ...current,
                            stock:
                              event.target
                                .value,
                          })
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div
                className={
                  styles.formSection
                }
              >
                <h3>
                  {isArabic
                    ? "الوصف"
                    : "Description"}
                </h3>

                <div
                  className={
                    styles.formGrid
                  }
                >
                  <div
                    className={
                      styles.field
                    }
                  >
                    <label>
                      {
                        text.descriptionArabic
                      }
                    </label>

                    <textarea
                      rows={5}
                      value={
                        form.description
                          .ar
                      }
                      onChange={(event) =>
                        updateLocalizedField(
                          "description",
                          "ar",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div
                    className={
                      styles.field
                    }
                  >
                    <label>
                      {
                        text.descriptionEnglish
                      }
                    </label>

                    <textarea
                      rows={5}
                      value={
                        form.description
                          .en
                      }
                      onChange={(event) =>
                        updateLocalizedField(
                          "description",
                          "en",
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div
                className={
                  styles.formSection
                }
              >
                <h3>
                  {isArabic
                    ? "الشارة"
                    : "Badge"}
                </h3>

                <div
                  className={
                    styles.formGrid
                  }
                >
                  <div
                    className={
                      styles.field
                    }
                  >
                    <label>
                      {text.badgeArabic}
                    </label>

                    <input
                      type="text"
                      value={
                        form.badge.ar
                      }
                      onChange={(event) =>
                        updateLocalizedField(
                          "badge",
                          "ar",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div
                    className={
                      styles.field
                    }
                  >
                    <label>
                      {text.badgeEnglish}
                    </label>

                    <input
                      type="text"
                      value={
                        form.badge.en
                      }
                      onChange={(event) =>
                        updateLocalizedField(
                          "badge",
                          "en",
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div
                className={
                  styles.optionsSection
                }
              >
                <label
                  className={
                    styles.checkboxLabel
                  }
                >
                  <input
                    type="checkbox"
                    checked={
                      form.featured
                    }
                    onChange={(event) =>
                      setForm(
                        (current) => ({
                          ...current,
                          featured:
                            event.target
                              .checked,
                        })
                      )
                    }
                  />

                  <span>
                    {text.featuredLabel}
                  </span>
                </label>

                <label
                  className={
                    styles.checkboxLabel
                  }
                >
                  <input
                    type="checkbox"
                    checked={
                      form.active
                    }
                    onChange={(event) =>
                      setForm(
                        (current) => ({
                          ...current,
                          active:
                            event.target
                              .checked,
                        })
                      )
                    }
                  />

                  <span>
                    {text.activeLabel}
                  </span>
                </label>
              </div>

              <div
                className={
                  styles.modalFooter
                }
              >
                <button
                  type="button"
                  className={
                    styles.cancelButton
                  }
                  onClick={closeForm}
                  disabled={saving}
                >
                  {text.cancel}
                </button>

                <button
                  type="submit"
                  className={
                    styles.submitButton
                  }
                  disabled={saving}
                >
                  {saving
                    ? text.saving
                    : editingProduct
                    ? text.update
                    : text.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div
          className={
            styles.modalOverlay
          }
        >
          <div
            className={
              styles.deleteModal
            }
            dir={isArabic ? "rtl" : "ltr"}
          >
            <div
              className={
                styles.deleteIcon
              }
            >
              <Trash2 size={27} />
            </div>

            <h2>
              {text.deleteTitle}
            </h2>

            <p>
              {text.deleteDescription}
            </p>

            <strong>
              {deleteTarget.name?.[
                locale
              ] ||
                deleteTarget.name?.ar ||
                deleteTarget.name?.en}
            </strong>

            <div
              className={
                styles.deleteActions
              }
            >
              <button
                type="button"
                className={
                  styles.cancelButton
                }
                onClick={() =>
                  setDeleteTarget(null)
                }
                disabled={deleting}
              >
                {text.cancel}
              </button>

              <button
                type="button"
                className={
                  styles.confirmDeleteButton
                }
                onClick={
                  handleDelete
                }
                disabled={deleting}
              >
                {deleting
                  ? text.deleting
                  : text.confirmDelete}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}