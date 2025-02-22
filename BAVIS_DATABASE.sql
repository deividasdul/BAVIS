PGDMP         :                 }            BAVIS    15.4    15.4 V    b           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            c           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            d           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            e           1262    24768    BAVIS    DATABASE     �   CREATE DATABASE "BAVIS" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "BAVIS";
                postgres    false            �            1259    25469    contact    TABLE     �   CREATE TABLE public.contact (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    gender text,
    phone_number text,
    status text,
    faculty text,
    "group" text,
    avatar_url text
);
    DROP TABLE public.contact;
       public         heap    postgres    false            �            1259    25468    contact_id_seq    SEQUENCE     �   CREATE SEQUENCE public.contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.contact_id_seq;
       public          postgres    false    217            f           0    0    contact_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.contact_id_seq OWNED BY public.contact.id;
          public          postgres    false    216            �            1259    25485 	   dormitory    TABLE     g   CREATE TABLE public.dormitory (
    id integer NOT NULL,
    address text NOT NULL,
    status text
);
    DROP TABLE public.dormitory;
       public         heap    postgres    false            �            1259    25484    dormitory_id_seq    SEQUENCE     �   CREATE SEQUENCE public.dormitory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.dormitory_id_seq;
       public          postgres    false    219            g           0    0    dormitory_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.dormitory_id_seq OWNED BY public.dormitory.id;
          public          postgres    false    218            �            1259    25543    interest    TABLE     V   CREATE TABLE public.interest (
    id integer NOT NULL,
    interest text NOT NULL
);
    DROP TABLE public.interest;
       public         heap    postgres    false            �            1259    25542    interest_id_seq    SEQUENCE     �   CREATE SEQUENCE public.interest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.interest_id_seq;
       public          postgres    false    227            h           0    0    interest_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.interest_id_seq OWNED BY public.interest.id;
          public          postgres    false    226            �            1259    33735    notification    TABLE     a   CREATE TABLE public.notification (
    id integer NOT NULL,
    message text,
    status text
);
     DROP TABLE public.notification;
       public         heap    postgres    false            �            1259    33734    notification_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.notification_id_seq;
       public          postgres    false    233            i           0    0    notification_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.notification_id_seq OWNED BY public.notification.id;
          public          postgres    false    232            �            1259    25525    payment_history    TABLE     �   CREATE TABLE public.payment_history (
    id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    payment_date date NOT NULL,
    stay_id integer,
    paid boolean
);
 #   DROP TABLE public.payment_history;
       public         heap    postgres    false            �            1259    25524    payment_history_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payment_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.payment_history_id_seq;
       public          postgres    false    225            j           0    0    payment_history_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.payment_history_id_seq OWNED BY public.payment_history.id;
          public          postgres    false    224            �            1259    25581    reservation    TABLE     �   CREATE TABLE public.reservation (
    id integer NOT NULL,
    user_id integer,
    room_id integer,
    planned_arrival_date date,
    planned_departure_date date,
    actual_arrival_date date,
    actual_departure_date date,
    status text
);
    DROP TABLE public.reservation;
       public         heap    postgres    false            �            1259    25580    reservation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reservation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.reservation_id_seq;
       public          postgres    false    231            k           0    0    reservation_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.reservation_id_seq OWNED BY public.reservation.id;
          public          postgres    false    230            �            1259    25494    room    TABLE     �   CREATE TABLE public.room (
    id integer NOT NULL,
    number text NOT NULL,
    floor integer NOT NULL,
    capacity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    dormitory_id integer,
    status text
);
    DROP TABLE public.room;
       public         heap    postgres    false            �            1259    25493    room_id_seq    SEQUENCE     �   CREATE SEQUENCE public.room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.room_id_seq;
       public          postgres    false    221            l           0    0    room_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.room_id_seq OWNED BY public.room.id;
          public          postgres    false    220            �            1259    25508    stay    TABLE       CREATE TABLE public.stay (
    id integer NOT NULL,
    user_id integer,
    room_id integer,
    planned_arrival_date date,
    planned_departure_date date,
    actual_arrival_date date,
    actual_departure_date date,
    paid boolean,
    status text
);
    DROP TABLE public.stay;
       public         heap    postgres    false            �            1259    25507    stay_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stay_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.stay_id_seq;
       public          postgres    false    223            m           0    0    stay_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.stay_id_seq OWNED BY public.stay.id;
          public          postgres    false    222            �            1259    25460    user    TABLE     �   CREATE TABLE public."user" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text NOT NULL,
    status text
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    25459    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    215            n           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    214            �            1259    25552    user_interest    TABLE     p   CREATE TABLE public.user_interest (
    id integer NOT NULL,
    interest_id integer,
    contact_id integer
);
 !   DROP TABLE public.user_interest;
       public         heap    postgres    false            �            1259    25551    user_interest_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_interest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.user_interest_id_seq;
       public          postgres    false    229            o           0    0    user_interest_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.user_interest_id_seq OWNED BY public.user_interest.id;
          public          postgres    false    228            �           2604    25472 
   contact id    DEFAULT     h   ALTER TABLE ONLY public.contact ALTER COLUMN id SET DEFAULT nextval('public.contact_id_seq'::regclass);
 9   ALTER TABLE public.contact ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �           2604    25488    dormitory id    DEFAULT     l   ALTER TABLE ONLY public.dormitory ALTER COLUMN id SET DEFAULT nextval('public.dormitory_id_seq'::regclass);
 ;   ALTER TABLE public.dormitory ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    25546    interest id    DEFAULT     j   ALTER TABLE ONLY public.interest ALTER COLUMN id SET DEFAULT nextval('public.interest_id_seq'::regclass);
 :   ALTER TABLE public.interest ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    33738    notification id    DEFAULT     r   ALTER TABLE ONLY public.notification ALTER COLUMN id SET DEFAULT nextval('public.notification_id_seq'::regclass);
 >   ALTER TABLE public.notification ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    233    232    233            �           2604    25528    payment_history id    DEFAULT     x   ALTER TABLE ONLY public.payment_history ALTER COLUMN id SET DEFAULT nextval('public.payment_history_id_seq'::regclass);
 A   ALTER TABLE public.payment_history ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225            �           2604    25584    reservation id    DEFAULT     p   ALTER TABLE ONLY public.reservation ALTER COLUMN id SET DEFAULT nextval('public.reservation_id_seq'::regclass);
 =   ALTER TABLE public.reservation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    230    231            �           2604    25497    room id    DEFAULT     b   ALTER TABLE ONLY public.room ALTER COLUMN id SET DEFAULT nextval('public.room_id_seq'::regclass);
 6   ALTER TABLE public.room ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    25511    stay id    DEFAULT     b   ALTER TABLE ONLY public.stay ALTER COLUMN id SET DEFAULT nextval('public.stay_id_seq'::regclass);
 6   ALTER TABLE public.stay ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    25463    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            �           2604    25555    user_interest id    DEFAULT     t   ALTER TABLE ONLY public.user_interest ALTER COLUMN id SET DEFAULT nextval('public.user_interest_id_seq'::regclass);
 ?   ALTER TABLE public.user_interest ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    229    229            O          0    25469    contact 
   TABLE DATA           x   COPY public.contact (id, first_name, last_name, gender, phone_number, status, faculty, "group", avatar_url) FROM stdin;
    public          postgres    false    217   ba       Q          0    25485 	   dormitory 
   TABLE DATA           8   COPY public.dormitory (id, address, status) FROM stdin;
    public          postgres    false    219   �b       Y          0    25543    interest 
   TABLE DATA           0   COPY public.interest (id, interest) FROM stdin;
    public          postgres    false    227   Sc       _          0    33735    notification 
   TABLE DATA           ;   COPY public.notification (id, message, status) FROM stdin;
    public          postgres    false    233   �f       W          0    25525    payment_history 
   TABLE DATA           R   COPY public.payment_history (id, amount, payment_date, stay_id, paid) FROM stdin;
    public          postgres    false    225   hh       ]          0    25581    reservation 
   TABLE DATA           �   COPY public.reservation (id, user_id, room_id, planned_arrival_date, planned_departure_date, actual_arrival_date, actual_departure_date, status) FROM stdin;
    public          postgres    false    231   �h       S          0    25494    room 
   TABLE DATA           X   COPY public.room (id, number, floor, capacity, price, dormitory_id, status) FROM stdin;
    public          postgres    false    221   i       U          0    25508    stay 
   TABLE DATA           �   COPY public.stay (id, user_id, room_id, planned_arrival_date, planned_departure_date, actual_arrival_date, actual_departure_date, paid, status) FROM stdin;
    public          postgres    false    223   j       M          0    25460    user 
   TABLE DATA           C   COPY public."user" (id, email, password, role, status) FROM stdin;
    public          postgres    false    215   ij       [          0    25552    user_interest 
   TABLE DATA           D   COPY public.user_interest (id, interest_id, contact_id) FROM stdin;
    public          postgres    false    229   Rm       p           0    0    contact_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.contact_id_seq', 46, true);
          public          postgres    false    216            q           0    0    dormitory_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.dormitory_id_seq', 64, true);
          public          postgres    false    218            r           0    0    interest_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.interest_id_seq', 190, true);
          public          postgres    false    226            s           0    0    notification_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.notification_id_seq', 62, true);
          public          postgres    false    232            t           0    0    payment_history_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.payment_history_id_seq', 1, false);
          public          postgres    false    224            u           0    0    reservation_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.reservation_id_seq', 47, true);
          public          postgres    false    230            v           0    0    room_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.room_id_seq', 106, true);
          public          postgres    false    220            w           0    0    stay_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.stay_id_seq', 22, true);
          public          postgres    false    222            x           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 74, true);
          public          postgres    false    214            y           0    0    user_interest_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.user_interest_id_seq', 79, true);
          public          postgres    false    228            �           2606    25476    contact contact_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.contact DROP CONSTRAINT contact_pkey;
       public            postgres    false    217            �           2606    25492    dormitory dormitory_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.dormitory
    ADD CONSTRAINT dormitory_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.dormitory DROP CONSTRAINT dormitory_pkey;
       public            postgres    false    219            �           2606    25550    interest interest_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.interest
    ADD CONSTRAINT interest_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.interest DROP CONSTRAINT interest_pkey;
       public            postgres    false    227            �           2606    33742    notification notification_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.notification DROP CONSTRAINT notification_pkey;
       public            postgres    false    233            �           2606    25530 $   payment_history payment_history_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.payment_history
    ADD CONSTRAINT payment_history_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.payment_history DROP CONSTRAINT payment_history_pkey;
       public            postgres    false    225            �           2606    25586    reservation reservation_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.reservation DROP CONSTRAINT reservation_pkey;
       public            postgres    false    231            �           2606    25501    room room_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.room DROP CONSTRAINT room_pkey;
       public            postgres    false    221            �           2606    25513    stay stay_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.stay
    ADD CONSTRAINT stay_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.stay DROP CONSTRAINT stay_pkey;
       public            postgres    false    223            �           2606    25620    room unique_room_number 
   CONSTRAINT     b   ALTER TABLE ONLY public.room
    ADD CONSTRAINT unique_room_number UNIQUE (number, dormitory_id);
 A   ALTER TABLE ONLY public.room DROP CONSTRAINT unique_room_number;
       public            postgres    false    221    221            �           2606    25629 #   reservation unique_user_reservation 
   CONSTRAINT     a   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT unique_user_reservation UNIQUE (user_id);
 M   ALTER TABLE ONLY public.reservation DROP CONSTRAINT unique_user_reservation;
       public            postgres    false    231            �           2606    25557     user_interest user_interest_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.user_interest
    ADD CONSTRAINT user_interest_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.user_interest DROP CONSTRAINT user_interest_pkey;
       public            postgres    false    229            �           2606    25467    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    215            �           2606    25621    contact fk_contact_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.contact
    ADD CONSTRAINT fk_contact_user FOREIGN KEY (id) REFERENCES public."user"(id) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.contact DROP CONSTRAINT fk_contact_user;
       public          postgres    false    215    217    3229            �           2606    25592    reservation fk_reservation_room    FK CONSTRAINT     }   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT fk_reservation_room FOREIGN KEY (room_id) REFERENCES public.room(id);
 I   ALTER TABLE ONLY public.reservation DROP CONSTRAINT fk_reservation_room;
       public          postgres    false    221    231    3235            �           2606    25587    reservation fk_reservation_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT fk_reservation_user FOREIGN KEY (user_id) REFERENCES public.contact(id);
 I   ALTER TABLE ONLY public.reservation DROP CONSTRAINT fk_reservation_user;
       public          postgres    false    3231    231    217            �           2606    25612    stay fk_stay_reservation    FK CONSTRAINT     x   ALTER TABLE ONLY public.stay
    ADD CONSTRAINT fk_stay_reservation FOREIGN KEY (id) REFERENCES public.reservation(id);
 B   ALTER TABLE ONLY public.stay DROP CONSTRAINT fk_stay_reservation;
       public          postgres    false    223    231    3247            �           2606    25575 &   user_interest fk_user_interest_contact    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_interest
    ADD CONSTRAINT fk_user_interest_contact FOREIGN KEY (contact_id) REFERENCES public.contact(id);
 P   ALTER TABLE ONLY public.user_interest DROP CONSTRAINT fk_user_interest_contact;
       public          postgres    false    3231    217    229            �           2606    25536 ,   payment_history payment_history_stay_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.payment_history
    ADD CONSTRAINT payment_history_stay_id_fkey FOREIGN KEY (stay_id) REFERENCES public.stay(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.payment_history DROP CONSTRAINT payment_history_stay_id_fkey;
       public          postgres    false    225    223    3239            �           2606    25502    room room_dormitory_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_dormitory_id_fkey FOREIGN KEY (dormitory_id) REFERENCES public.dormitory(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.room DROP CONSTRAINT room_dormitory_id_fkey;
       public          postgres    false    221    3233    219            �           2606    25519    stay stay_room_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stay
    ADD CONSTRAINT stay_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.room(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.stay DROP CONSTRAINT stay_room_id_fkey;
       public          postgres    false    221    3235    223            �           2606    25514    stay stay_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stay
    ADD CONSTRAINT stay_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.stay DROP CONSTRAINT stay_user_id_fkey;
       public          postgres    false    3229    223    215            �           2606    25560 ,   user_interest user_interest_interest_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_interest
    ADD CONSTRAINT user_interest_interest_id_fkey FOREIGN KEY (interest_id) REFERENCES public.interest(id);
 V   ALTER TABLE ONLY public.user_interest DROP CONSTRAINT user_interest_interest_id_fkey;
       public          postgres    false    229    3243    227            O   f  x��S�n�0�/O��q2"���
�P�XŤ��R�3ҽ�WCP@�%w�s���!0VT���
%L�Jp���q���r%"}���l%�X`̞GB�QZā>�5����,F.���{8 ����dٜq��|!�U��|����	������'�1�}�h�W��THJ�D�E/�ʹ�M �&��S�Y�^;��`�IbL�H�Dk���M�
�.��03��X���e�WU�/�o7�W���P(r"����갸fX<���EZ������{v3����	���l����a��9--*v,zUC�(����W�w�;�_�.�UP�?kZ��` m      Q   k   x�3�H<�03���b�t=cK��Ҽ�bN��̲T.cN�Ĝ���#��G7�����1��S�.:2�dLA�����SL5F�j�8C3��!҆F���1z\\\ "d:"      Y   `  x�mT;r�8�ѧ�	����.��-ZS$U��J�'��5��N��^R���ڤ�	��UY�Eܥ*k��OA��xn ���	���hkA�wI�߅�������H{���>�{�}5��#/yA>~��FzN�W@�y�1wU�[������
&�a�8� �yJG*^0x��0vf�W��޵ ��s�Su��%��A�rK�tg���������T���jI.�Q1b]�S��t]��S7�Z��\���FOH��$<.�7劉�;ozX��7.���2�z �zR�>c�����k�S9ZSBx�Oh�!�]�A�b�H���2X�O�M�&�z2�x��2�M3*�V�3|okR��hzP�d|��:�OߴY̜�����%i4#��r���

���-��"�6�U��)���(`� +3GJ��e��q����iCw��v�L�q���`ۃÍ�O� '�xY0���IN�m7Nǌ]	+G�$)�1��w�&da� i�MD-E�l��GƎ�ob:�6_�׵L�}�΍�:�"��Ý����dz�!�9���J#�]��w��ܗ�ԽgϾ�e���U�58!3�����rz�� w�%���x����E:r�nS�g?�y?�6zcO���X4�����:.��P2bo>I*�q����X�rB6������y���Ѐǰ&�6�>�< 烜��I�pGB�li�1���?��u)���$0��%�|�\���nefy4�R㝑jK�	=�`��Y8a�Ď��ad��ȑ'�?"[�b!^�G!c��XT}�	f������p�xf�s��� ��q�~��HD��{��bl�x���{<\�G	1��M�B������r��rJ      _   �  x��R=O#1�7�bJ�����\3�M��+��?��jDGj��Z��/�$�ut���7��*n��'�7ʙ��6�
�Bʅ���"��(:��T��V>:�����T	6ʩ��*�����}i�"2-m4�Ҵ*��=��3(m톅�E&�>Z�����2``�+g����:=���*ȎuS�a\z���%a:��"�S��R���$K�eԧ�Y-�ӝґ6��n�9.n���Q���:bo��/S�d�q�<����nӖ�h�"�����VV!�$ެ�����#���1��5�/^CD���	���4��T1�E�Mtk��0q��6F�����������<��C�T�i+�0PI4�^>Z��k�q��*}xǻ��s�L&���      W   ,   x�3�47�30�4202�54�5��4�,�2B6��q��qqq �bw      ]   e   x�3�41�45�4202�54 "8������\�Y��ed�ib�i��5��D�c�ib�l��X�q�Zb�c�khR�P�!B-P�92�6Ə+F��� ��/�      S   �   x�]�;n�0К>̂I�*s�t�郜?CIч�^=0���'J$T�Ō�������e7D�<A�>y��)���������D�ed�AZ����!A��)�Z/y �X�TH�ZO�Lں���V���%	����S'�M��@
�>� ���N���^�_�M)�18>�H�2����L���V�L�Q�ݖ�X�K�S'i��%
��z�g��t۞%��Ր)��V��ol���X}�}�����u]��n��      U   <   x�3�47�45�4202�54�5�1ML,�%���%�e�\F�&&�u���PLu� �g�      M   �  x�m�ɖ�H���FH�!wdPQOoR@����ԩۧ-}�/"��H������I�0/��.g� �d�ORP�媍Ym/ь�NT���Aڌ ���k����A�ʲ�J]wv��fR��w��3?:M���[����(�0!ǭ��&��-�dB�jDW�h��4�z�������_�Uo�ڕ�]E��.3�g��-�h��c��Nף��GG�I�;�V����*�i��!	�W=��\���(���.���!���vQ4��Վm��.>��х������7���܂���1�P����m�2-c��zޖ�>G��B���(�.�����Q@�r,��|_ƴ�g��*f�z;�9�U�\���Z��t&�){�}��ծ��D��y���FZh��v��qpF��C޶�&P�.��J6~^aF��%��B�gl�LݹN$c��:�鑖챁���;j�
==���G:������n��/kS��ls�����u�H(�l�#QVU�H�1�D�%���/�\C�D@��sI2��`�Y�O�h�Ǧ�8�eu�t���+gRR����y��U�����w�\x�$�-ѾA�c�dD���Ә,↿1����v�a҅o�GZ����ziw���*�1���J�<�Xx�x�ʾ�z��(����yo~�����n/Z������#,R(�G�W��u�C�_��#B�vi���N��?���ǿ���D      [   p   x�-��1�3*&c���{I�uD���!�a�m��4>�*��*��@�I��sU���Q�ݫ�s�c)�ή�s�Qj�kIԫ�N�I�ݎ�T�bkK���-dt���O�~ � �h �     