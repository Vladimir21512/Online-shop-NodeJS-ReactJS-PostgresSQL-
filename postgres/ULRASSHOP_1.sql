PGDMP                        |            ULRASSHOP_1    16.1    16.1 �    a           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            b           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            c           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            d           1262    43158    ULRASSHOP_1    DATABASE     �   CREATE DATABASE "ULRASSHOP_1" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "ULRASSHOP_1";
                postgres    false            �            1259    45637 
   activateds    TABLE       CREATE TABLE public.activateds (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "activationLink" character varying(255) NOT NULL,
    active boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.activateds;
       public         heap    postgres    false            �            1259    45636    activateds_id_seq    SEQUENCE     �   CREATE SEQUENCE public.activateds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.activateds_id_seq;
       public          postgres    false    244            e           0    0    activateds_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.activateds_id_seq OWNED BY public.activateds.id;
          public          postgres    false    243            �            1259    45540    basket_products    TABLE     �   CREATE TABLE public.basket_products (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "basketId" integer,
    "productId" integer
);
 #   DROP TABLE public.basket_products;
       public         heap    postgres    false            �            1259    45539    basket_products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.basket_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.basket_products_id_seq;
       public          postgres    false    230            f           0    0    basket_products_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.basket_products_id_seq OWNED BY public.basket_products.id;
          public          postgres    false    229            �            1259    45469    baskets    TABLE     �   CREATE TABLE public.baskets (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);
    DROP TABLE public.baskets;
       public         heap    postgres    false            �            1259    45468    baskets_id_seq    SEQUENCE     �   CREATE SEQUENCE public.baskets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.baskets_id_seq;
       public          postgres    false    218            g           0    0    baskets_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.baskets_id_seq OWNED BY public.baskets.id;
          public          postgres    false    217            �            1259    45488    brands    TABLE     �   CREATE TABLE public.brands (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.brands;
       public         heap    postgres    false            �            1259    45487    brands_id_seq    SEQUENCE     �   CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.brands_id_seq;
       public          postgres    false    222            h           0    0    brands_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;
          public          postgres    false    221            �            1259    45495 
   categories    TABLE     �   CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    45494    categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          postgres    false    224            i           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public          postgres    false    223            �            1259    45571    colors    TABLE     �   CREATE TABLE public.colors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    hex character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.colors;
       public         heap    postgres    false            �            1259    45570    colors_id_seq    SEQUENCE     �   CREATE SEQUENCE public.colors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.colors_id_seq;
       public          postgres    false    234            j           0    0    colors_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.colors_id_seq OWNED BY public.colors.id;
          public          postgres    false    233            �            1259    45580    comments    TABLE     �  CREATE TABLE public.comments (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    "time" character varying(255) NOT NULL,
    "userImg" character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    "productId" integer
);
    DROP TABLE public.comments;
       public         heap    postgres    false            �            1259    45579    comments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public          postgres    false    236            k           0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public          postgres    false    235            �            1259    45481 	   materials    TABLE     �   CREATE TABLE public.materials (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.materials;
       public         heap    postgres    false            �            1259    45480    materials_id_seq    SEQUENCE     �   CREATE SEQUENCE public.materials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.materials_id_seq;
       public          postgres    false    220            l           0    0    materials_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.materials_id_seq OWNED BY public.materials.id;
          public          postgres    false    219            �            1259    45599    messages    TABLE     �   CREATE TABLE public.messages (
    id integer NOT NULL,
    text character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);
    DROP TABLE public.messages;
       public         heap    postgres    false            �            1259    45598    messages_id_seq    SEQUENCE     �   CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.messages_id_seq;
       public          postgres    false    238            m           0    0    messages_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;
          public          postgres    false    237            �            1259    45618    orders    TABLE     j  CREATE TABLE public.orders (
    id integer NOT NULL,
    user_email character varying(255) NOT NULL,
    product_name character varying(255) NOT NULL,
    product_price character varying(255) NOT NULL,
    size character varying(255) NOT NULL,
    color character varying(255) NOT NULL,
    "FIO" character varying(255) NOT NULL,
    phone_number character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    street character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    "productId" integer
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    45617    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    242            n           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    241            �            1259    45557    productInfoColors    TABLE     �  CREATE TABLE public."productInfoColors" (
    id integer NOT NULL,
    color character varying(255) NOT NULL,
    sizes character varying(255) NOT NULL,
    hex character varying(255) NOT NULL,
    img1 character varying(255),
    img2 character varying(255),
    img3 character varying(255),
    img4 character varying(255),
    img5 character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "productId" integer
);
 '   DROP TABLE public."productInfoColors";
       public         heap    postgres    false            �            1259    45556    productInfoColors_id_seq    SEQUENCE     �   CREATE SEQUENCE public."productInfoColors_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."productInfoColors_id_seq";
       public          postgres    false    232            o           0    0    productInfoColors_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."productInfoColors_id_seq" OWNED BY public."productInfoColors".id;
          public          postgres    false    231            �            1259    45649    product_colors    TABLE     �   CREATE TABLE public.product_colors (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "colorId" integer,
    "productId" integer
);
 "   DROP TABLE public.product_colors;
       public         heap    postgres    false            �            1259    45648    product_colors_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_colors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.product_colors_id_seq;
       public          postgres    false    246            p           0    0    product_colors_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.product_colors_id_seq OWNED BY public.product_colors.id;
          public          postgres    false    245            �            1259    45509    products    TABLE     �  CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "materialId" integer NOT NULL,
    "brandId" integer NOT NULL,
    img character varying(255) NOT NULL,
    "categoryId" integer NOT NULL,
    type character varying(255) NOT NULL,
    price integer NOT NULL,
    description character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "sexId" integer
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    45508    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    228            q           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    227            �            1259    45502    sexes    TABLE     �   CREATE TABLE public.sexes (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.sexes;
       public         heap    postgres    false            �            1259    45501    sexes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sexes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.sexes_id_seq;
       public          postgres    false    226            r           0    0    sexes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.sexes_id_seq OWNED BY public.sexes.id;
          public          postgres    false    225            �            1259    45611    sizes    TABLE     �   CREATE TABLE public.sizes (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.sizes;
       public         heap    postgres    false            �            1259    45610    sizes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sizes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.sizes_id_seq;
       public          postgres    false    240            s           0    0    sizes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.sizes_id_seq OWNED BY public.sizes.id;
          public          postgres    false    239            �            1259    45453    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "isBanned" boolean DEFAULT false NOT NULL,
    email character varying(255),
    password character varying(255),
    img character varying(255),
    role character varying(255) DEFAULT 'USER'::character varying,
    uuid character varying(255),
    "isActive" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    45452    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            t           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            v           2604    45640    activateds id    DEFAULT     n   ALTER TABLE ONLY public.activateds ALTER COLUMN id SET DEFAULT nextval('public.activateds_id_seq'::regclass);
 <   ALTER TABLE public.activateds ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243    244            o           2604    45543    basket_products id    DEFAULT     x   ALTER TABLE ONLY public.basket_products ALTER COLUMN id SET DEFAULT nextval('public.basket_products_id_seq'::regclass);
 A   ALTER TABLE public.basket_products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    230    230            i           2604    45472 
   baskets id    DEFAULT     h   ALTER TABLE ONLY public.baskets ALTER COLUMN id SET DEFAULT nextval('public.baskets_id_seq'::regclass);
 9   ALTER TABLE public.baskets ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            k           2604    45491 	   brands id    DEFAULT     f   ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);
 8   ALTER TABLE public.brands ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            l           2604    45498    categories id    DEFAULT     n   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            q           2604    45574 	   colors id    DEFAULT     f   ALTER TABLE ONLY public.colors ALTER COLUMN id SET DEFAULT nextval('public.colors_id_seq'::regclass);
 8   ALTER TABLE public.colors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    233    234    234            r           2604    45583    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    236    236            j           2604    45484    materials id    DEFAULT     l   ALTER TABLE ONLY public.materials ALTER COLUMN id SET DEFAULT nextval('public.materials_id_seq'::regclass);
 ;   ALTER TABLE public.materials ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            s           2604    45602    messages id    DEFAULT     j   ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);
 :   ALTER TABLE public.messages ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237    238            u           2604    45621 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    242    241    242            p           2604    45560    productInfoColors id    DEFAULT     �   ALTER TABLE ONLY public."productInfoColors" ALTER COLUMN id SET DEFAULT nextval('public."productInfoColors_id_seq"'::regclass);
 E   ALTER TABLE public."productInfoColors" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    232    232            w           2604    45652    product_colors id    DEFAULT     v   ALTER TABLE ONLY public.product_colors ALTER COLUMN id SET DEFAULT nextval('public.product_colors_id_seq'::regclass);
 @   ALTER TABLE public.product_colors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    245    246    246            n           2604    45512    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    228    228            m           2604    45505    sexes id    DEFAULT     d   ALTER TABLE ONLY public.sexes ALTER COLUMN id SET DEFAULT nextval('public.sexes_id_seq'::regclass);
 7   ALTER TABLE public.sexes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            t           2604    45614    sizes id    DEFAULT     d   ALTER TABLE ONLY public.sizes ALTER COLUMN id SET DEFAULT nextval('public.sizes_id_seq'::regclass);
 7   ALTER TABLE public.sizes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    240    240            e           2604    45456    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            \          0    45637 
   activateds 
   TABLE DATA           f   COPY public.activateds (id, "userId", "activationLink", active, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    244   ��       N          0    45540    basket_products 
   TABLE DATA           `   COPY public.basket_products (id, "createdAt", "updatedAt", "basketId", "productId") FROM stdin;
    public          postgres    false    230   ڦ       B          0    45469    baskets 
   TABLE DATA           I   COPY public.baskets (id, "createdAt", "updatedAt", "userId") FROM stdin;
    public          postgres    false    218   ��       F          0    45488    brands 
   TABLE DATA           D   COPY public.brands (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    222   4�       H          0    45495 
   categories 
   TABLE DATA           H   COPY public.categories (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    224   ��       R          0    45571    colors 
   TABLE DATA           I   COPY public.colors (id, name, hex, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    234   ��       T          0    45580    comments 
   TABLE DATA           ~   COPY public.comments (id, title, "time", "userImg", description, "createdAt", "updatedAt", "userId", "productId") FROM stdin;
    public          postgres    false    236   p�       D          0    45481 	   materials 
   TABLE DATA           G   COPY public.materials (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   ��       V          0    45599    messages 
   TABLE DATA           P   COPY public.messages (id, text, "createdAt", "updatedAt", "userId") FROM stdin;
    public          postgres    false    238   �       Z          0    45618    orders 
   TABLE DATA           �   COPY public.orders (id, user_email, product_name, product_price, size, color, "FIO", phone_number, city, street, "createdAt", "updatedAt", "userId", "productId") FROM stdin;
    public          postgres    false    242   �       P          0    45557    productInfoColors 
   TABLE DATA           �   COPY public."productInfoColors" (id, color, sizes, hex, img1, img2, img3, img4, img5, "createdAt", "updatedAt", "productId") FROM stdin;
    public          postgres    false    232   %�       ^          0    45649    product_colors 
   TABLE DATA           ^   COPY public.product_colors (id, "createdAt", "updatedAt", "colorId", "productId") FROM stdin;
    public          postgres    false    246   �       L          0    45509    products 
   TABLE DATA           �   COPY public.products (id, name, "materialId", "brandId", img, "categoryId", type, price, description, "createdAt", "updatedAt", "sexId") FROM stdin;
    public          postgres    false    228   1�       J          0    45502    sexes 
   TABLE DATA           C   COPY public.sexes (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    226   N�       X          0    45611    sizes 
   TABLE DATA           C   COPY public.sizes (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    240   ��       @          0    45453    users 
   TABLE DATA           }   COPY public.users (id, name, "isBanned", email, password, img, role, uuid, "isActive", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   ��       u           0    0    activateds_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.activateds_id_seq', 1, false);
          public          postgres    false    243            v           0    0    basket_products_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.basket_products_id_seq', 8, true);
          public          postgres    false    229            w           0    0    baskets_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.baskets_id_seq', 1, true);
          public          postgres    false    217            x           0    0    brands_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.brands_id_seq', 2, true);
          public          postgres    false    221            y           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 2, true);
          public          postgres    false    223            z           0    0    colors_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.colors_id_seq', 2, true);
          public          postgres    false    233            {           0    0    comments_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.comments_id_seq', 1, false);
          public          postgres    false    235            |           0    0    materials_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.materials_id_seq', 2, true);
          public          postgres    false    219            }           0    0    messages_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.messages_id_seq', 1, false);
          public          postgres    false    237            ~           0    0    orders_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.orders_id_seq', 1, false);
          public          postgres    false    241                       0    0    productInfoColors_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."productInfoColors_id_seq"', 3, true);
          public          postgres    false    231            �           0    0    product_colors_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.product_colors_id_seq', 1, false);
          public          postgres    false    245            �           0    0    products_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.products_id_seq', 2, true);
          public          postgres    false    227            �           0    0    sexes_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.sexes_id_seq', 3, true);
          public          postgres    false    225            �           0    0    sizes_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.sizes_id_seq', 2, true);
          public          postgres    false    239            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    215            �           2606    45642    activateds activateds_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.activateds
    ADD CONSTRAINT activateds_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.activateds DROP CONSTRAINT activateds_pkey;
       public            postgres    false    244            �           2606    45545 $   basket_products basket_products_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.basket_products
    ADD CONSTRAINT basket_products_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.basket_products DROP CONSTRAINT basket_products_pkey;
       public            postgres    false    230                       2606    45474    baskets baskets_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.baskets
    ADD CONSTRAINT baskets_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.baskets DROP CONSTRAINT baskets_pkey;
       public            postgres    false    218            �           2606    45493    brands brands_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.brands DROP CONSTRAINT brands_pkey;
       public            postgres    false    222            �           2606    45500    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    224            �           2606    45578    colors colors_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.colors DROP CONSTRAINT colors_pkey;
       public            postgres    false    234            �           2606    45587    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    236            �           2606    45486    materials materials_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.materials DROP CONSTRAINT materials_pkey;
       public            postgres    false    220            �           2606    45604    messages messages_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    238            �           2606    45625    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    242            �           2606    45564 (   productInfoColors productInfoColors_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."productInfoColors"
    ADD CONSTRAINT "productInfoColors_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."productInfoColors" DROP CONSTRAINT "productInfoColors_pkey";
       public            postgres    false    232            �           2606    45656 3   product_colors product_colors_colorId_productId_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_colors
    ADD CONSTRAINT "product_colors_colorId_productId_key" UNIQUE ("colorId", "productId");
 _   ALTER TABLE ONLY public.product_colors DROP CONSTRAINT "product_colors_colorId_productId_key";
       public            postgres    false    246    246            �           2606    45654 "   product_colors product_colors_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.product_colors
    ADD CONSTRAINT product_colors_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.product_colors DROP CONSTRAINT product_colors_pkey;
       public            postgres    false    246            �           2606    45518    products products_name_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_name_key UNIQUE (name);
 D   ALTER TABLE ONLY public.products DROP CONSTRAINT products_name_key;
       public            postgres    false    228            �           2606    45516    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    228            �           2606    45507    sexes sexes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.sexes
    ADD CONSTRAINT sexes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.sexes DROP CONSTRAINT sexes_pkey;
       public            postgres    false    226            �           2606    45616    sizes sizes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT sizes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.sizes DROP CONSTRAINT sizes_pkey;
       public            postgres    false    240            y           2606    45465    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            {           2606    45463    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            }           2606    45467    users users_uuid_key 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_uuid_key UNIQUE (uuid);
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT users_uuid_key;
       public            postgres    false    216            �           2606    45643 !   activateds activateds_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.activateds
    ADD CONSTRAINT "activateds_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.activateds DROP CONSTRAINT "activateds_userId_fkey";
       public          postgres    false    4731    216    244            �           2606    45546 -   basket_products basket_products_basketId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.basket_products
    ADD CONSTRAINT "basket_products_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES public.baskets(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Y   ALTER TABLE ONLY public.basket_products DROP CONSTRAINT "basket_products_basketId_fkey";
       public          postgres    false    4735    218    230            �           2606    45551 .   basket_products basket_products_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.basket_products
    ADD CONSTRAINT "basket_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Z   ALTER TABLE ONLY public.basket_products DROP CONSTRAINT "basket_products_productId_fkey";
       public          postgres    false    4747    230    228            �           2606    45475    baskets baskets_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.baskets
    ADD CONSTRAINT "baskets_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 G   ALTER TABLE ONLY public.baskets DROP CONSTRAINT "baskets_userId_fkey";
       public          postgres    false    4731    218    216            �           2606    45593     comments comments_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.comments DROP CONSTRAINT "comments_productId_fkey";
       public          postgres    false    4747    236    228            �           2606    45588    comments comments_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.comments DROP CONSTRAINT "comments_userId_fkey";
       public          postgres    false    216    236    4731            �           2606    45605    messages messages_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.messages DROP CONSTRAINT "messages_userId_fkey";
       public          postgres    false    216    238    4731            �           2606    45631    orders orders_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;
 H   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_productId_fkey";
       public          postgres    false    242    4747    228            �           2606    45626    orders orders_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_userId_fkey";
       public          postgres    false    216    4731    242            �           2606    45565 2   productInfoColors productInfoColors_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."productInfoColors"
    ADD CONSTRAINT "productInfoColors_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;
 `   ALTER TABLE ONLY public."productInfoColors" DROP CONSTRAINT "productInfoColors_productId_fkey";
       public          postgres    false    228    232    4747            �           2606    45657 *   product_colors product_colors_colorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_colors
    ADD CONSTRAINT "product_colors_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES public.colors(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.product_colors DROP CONSTRAINT "product_colors_colorId_fkey";
       public          postgres    false    246    234    4753            �           2606    45662 ,   product_colors product_colors_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_colors
    ADD CONSTRAINT "product_colors_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.product_colors DROP CONSTRAINT "product_colors_productId_fkey";
       public          postgres    false    4747    228    246            �           2606    45524    products products_brandId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES public.brands(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.products DROP CONSTRAINT "products_brandId_fkey";
       public          postgres    false    4739    222    228            �           2606    45529 !   products products_categoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.products DROP CONSTRAINT "products_categoryId_fkey";
       public          postgres    false    4741    224    228            �           2606    45519 !   products products_materialId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES public.materials(id) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.products DROP CONSTRAINT "products_materialId_fkey";
       public          postgres    false    4737    220    228            �           2606    45534    products products_sexId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_sexId_fkey" FOREIGN KEY ("sexId") REFERENCES public.sexes(id) ON UPDATE CASCADE ON DELETE SET NULL;
 H   ALTER TABLE ONLY public.products DROP CONSTRAINT "products_sexId_fkey";
       public          postgres    false    228    4743    226            \      x������ � �      N      x������ � �      B   -   x�3�4202�50�52S04�22�24�346�60�'e����� rf2      F   Q   x�3�0�;�x��FN##]C]#3C3+#s+K=KCcm<R\F��^�pa�]����,�ͱ ������ pC$X      H   Z   x�3�0�b�ņ�Mv]��id`d�k`�kd�`hfedfel�gab�m`�G��dHÅ}/6^�waШ��ML�M,������� e+      R   a   x�3估�bÅ/��}a'�r��Q�Q2�������������������������n.#N�1;.�b�A���f�iX���Y��c7	&����� &�*�      T      x������ � �      D   N   x�3�0��֋M�q����)�Y�Y��Zh���2�0�bㅭ�^����T�� �0)�=... Qz"�      V      x������ � �      Z      x������ � �      P   �   x�}�;NA�z�H�����<v����f�3�D�#@�e(��a�FD�$��%���Y_��rl}0�������^g�"���d`C��f��9I�����L۟"$�@�����H����!�Mێ.߈�Ԫ�C)�F�s�D�!���|�h�3ʯM��\��_A�G�fy_���F9��������WJ�ZxU)X RJ ޹�ޣ���su˟�S�$S�u�V�l�      ^      x������ � �      L      x������ � �      J   P   x�3�0�����D��P��L��������X���\�� ���iX�-�L-ph�Iqs^X�)oj�g`h�U+\�+F��� V�$+      X   ;   x�3���4202�50�52S04�2"#=Km�2\F��4���c�	������ A�      @   �   x�}��N�@ ���=p3���n��R�!�4��i/�,[b�����]?���r�a�L׼j�f`C��ڼ�ʲo����Я��G�$q��Q�s�;t�����~���r���/�=E'��軅�h��9X?o�0 UDƈPW�P�A���5ڒ�������`� �b�"���;�}H���7�7b     