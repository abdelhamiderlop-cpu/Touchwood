const API_URL =
  "https://touchwood-production-1bed.up.railway.app/api";

export const getProducts = async (params = {}) => {
  const query = new URLSearchParams();

  if (params.category) {
    query.set("category", params.category);
  }

  if (params.featured !== undefined) {
    query.set("featured", String(params.featured));
  }

  if (params.active !== undefined) {
    query.set("active", String(params.active));
  }

  if (params.search) {
    query.set("search", params.search);
  }

  const queryString = query.toString();

  const response = await fetch(
    `${API_URL}/products${queryString ? `?${queryString}` : ""}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch products"
    );
  }

  return data;
};

export const getProductById = async (id) => {
  const response = await fetch(
    `${API_URL}/products/${id}`
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to fetch product"
    );

    error.status = response.status;

    throw error;
  }

  return data;
};

export const getProductBySlug = async (slug) => {
  const response = await fetch(
    `${API_URL}/products/slug/${slug}`
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to fetch product"
    );

    error.status = response.status;

    throw error;
  }

  return data;
};

export const createProduct = async (
  token,
  productData
) => {
  const response = await fetch(
    `${API_URL}/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create product"
    );
  }

  return data;
};

export const updateProduct = async (
  token,
  productId,
  productData
) => {
  const response = await fetch(
    `${API_URL}/products/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update product"
    );
  }

  return data;
};

export const deleteProduct = async (
  token,
  productId
) => {
  const response = await fetch(
    `${API_URL}/products/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete product"
    );
  }

  return data;
};

export const register = async (userData) => {
  const response = await fetch(
    `${API_URL}/user/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.message || "Registration failed"
    );
  }

  return response.json();
};

export const logIn = async (userData) => {
  const response = await fetch(
    `${API_URL}/user/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();

  console.log("Login status:", response.status);
  console.log("Login response:", data);

  if (!response.ok) {
    throw new Error(
      data.message ||
        data.error ||
        "Login failed"
    );
  }

  return data;
};

export const getOrders = async (token) => {
  const response = await fetch(
    `${API_URL}/orders`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch orders"
    );
  }

  return data;
};

export const checkout = async (
  token,
  orderData
) => {
  const response = await fetch(
    `${API_URL}/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Checkout failed"
    );
  }

  return data;
};

export const getOrderById = async (
  token,
  orderId
) => {
  const response = await fetch(
    `${API_URL}/orders/${orderId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch order"
    );
  }

  return data;
};

export const cancelOrder = async (
  token,
  orderId
) => {
  const response = await fetch(
    `${API_URL}/orders/${orderId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to cancel order"
    );
  }

  return data;
};

export const getCart = async (token) => {
  const response = await fetch(
    `${API_URL}/cart`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (response.status === 404) {
    return {
      cart: null,
      products: [],
    };
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch cart"
    );
  }

  return {
    cart:
      data.yourCart ||
      data.cart ||
      null,
  };
};

export const addCartItem = async (
  token,
  productId,
  quantity = 1
) => {
  const response = await fetch(
    `${API_URL}/cart`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to add product to cart"
    );
  }

  return data;
};

export const updateCartItem = async (
  token,
  productId,
  quantity
) => {
  const response = await fetch(
    `${API_URL}/cart`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to update cart"
    );
  }

  return data;
};

export const removeCartItem = async (
  token,
  productId
) => {
  const response = await fetch(
    `${API_URL}/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to remove product from cart"
    );
  }

  return data;
};

export const clearCart = async (token) => {
  const response = await fetch(
    `${API_URL}/cart`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to clear cart"
    );
  }

  return data;
};

export const getFavorites = async (token) => {
  const response = await fetch(
    `${API_URL}/favorites`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch favorites"
    );
  }

  return data;
};

export const addFavorite = async (
  token,
  productId
) => {
  const response = await fetch(
    `${API_URL}/favorites`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to add favorite"
    );
  }

  return data;
};

export const removeFavorite = async (
  token,
  productId
) => {
  const response = await fetch(
    `${API_URL}/favorites/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to remove favorite"
    );
  }

  return data;
};

export const updateProfile = async (
  token,
  userData
) => {
  const response = await fetch(
    `${API_URL}/user/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to update profile"
    );
  }

  return data;
};

export const changePassword = async (
  token,
  currentPassword,
  newPassword
) => {
  const response = await fetch(
    `${API_URL}/user/password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to change password"
    );
  }

  return data;
};

export const getAdminDashboard = async (
  token
) => {
  const response = await fetch(
    `${API_URL}/admin/dashboard`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch admin dashboard"
    );
  }

  return data;
};

export const getAdminOrders = async (
  token
) => {
  const response = await fetch(
    `${API_URL}/admin/orders`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch admin orders"
    );
  }

  return data;
};

export const updateAdminOrderStatus = async (
  token,
  orderId,
  status
) => {
  const response = await fetch(
    `${API_URL}/admin/orders/${orderId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to update order status"
    );
  }

  return data;
};

export const getAdminUsers = async (
  token
) => {
  const response = await fetch(
    `${API_URL}/admin/users`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch admin users"
    );
  }

  return data;
};

export const getAdminNotifications = async (
  token
) => {
  const response = await fetch(
    `${API_URL}/admin/notifications`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch notifications"
    );
  }

  return data;
};

export const markAdminNotificationAsRead =
  async (
    token,
    notificationId
  ) => {
    const response = await fetch(
      `${API_URL}/admin/notifications/${notificationId}/read`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to mark notification as read"
      );
    }

    return data;
  };

export const markAllAdminNotificationsAsRead =
  async (token) => {
    const response = await fetch(
      `${API_URL}/admin/notifications/read-all`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to mark all notifications as read"
      );
    }

    return data;
  };

export const deleteAdminNotification =
  async (
    token,
    notificationId
  ) => {
    const response = await fetch(
      `${API_URL}/admin/notifications/${notificationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to delete notification"
      );
    }

    return data;
  };

export const getProductReviews = async (
  productId
) => {
  const response = await fetch(
    `${API_URL}/reviews/product/${productId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch reviews"
    );
  }

  return data;
};

export const getOrderReviewStatus = async (
  token,
  orderId
) => {
  const response = await fetch(
    `${API_URL}/reviews/order/${orderId}/status`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch review status"
    );
  }

  return data;
};

export const createReview = async (
  token,
  reviewData
) => {
  const response = await fetch(
    `${API_URL}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to add review"
    );
  }

  return data;
};