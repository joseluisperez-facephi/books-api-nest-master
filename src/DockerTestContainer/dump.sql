--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3 (Debian 14.3-1.pgdg110+1)
-- Dumped by pg_dump version 14.3 (Debian 14.3-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    titulo character varying NOT NULL,
    isbn character varying NOT NULL,
    resumen character varying NOT NULL,
    fechadecreacion date,
    fechadepublicacion date,
    autor character varying NOT NULL,
    editorial character varying NOT NULL,
    "urlPDF" character varying NOT NULL,
    categoria text[] NOT NULL,
    idioma text[] NOT NULL,
    valoracion double precision NOT NULL,
    "userId" uuid
);


ALTER TABLE public.book OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "fullName" text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    roles text[] DEFAULT '{user}'::text[] NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.book (id, titulo, isbn, resumen, fechadecreacion, fechadepublicacion, autor, editorial, "urlPDF", categoria, idioma, valoracion, "userId") FROM stdin;
88329128-e661-495e-bade-4b8406a9451b	Y gano Argentina	33338xx9-80f0-44b6-x778-14617e5306c1	Nunca hubo uno pero seguimos estudiandolos	\N	\N	Raimundo Colorado Pelado	Ediciones la hora		{"La de arriba"}	{ARA}	5	\N
5a7d0029-6e12-46e0-ae3a-4f0f8c1002a4	Y perdio Argentina	32238xx9-80f0-44b6-x778-14617e5306c1	Nunca hubo uno pero seguimos estudiandolos	\N	\N	Carlos Pérez Tumbado	Ediciones la hora		{"La de arriba"}	{ARA}	4	\N
e4c7b510-671f-4d2d-ad8d-0b8048cd3e15	Cuanto vale'	01238xx9-80f0-44b6-x778-14617e5306c1	Siempre hubo uno pero seguimos estudiandolos	\N	\N	Manuel Ufosi Tosi	Ediciones la hora		{"La de arriba"}	{ESP}	7	\N
998cece1-e368-4cea-9573-2e7ca23bb192	Papiro'	99238xx9-80f0-44b6-x778-14617e5306c1	Siempre hubo uno pero seguimos estudiandolos	\N	\N	Manuel Ufosi Tosi	Ediciones la hora		{"La de arriba"}	{ESP}	7	\N
ba50fb54-3c03-4db9-8b8c-1264cf337a0f	Por fin vacas'	34238xx9-80f0-44b6-x778-14617e5306c1	Siempre hubo uno pero seguimos estudiandolos	\N	\N	Manuel Ufosi Tosi	Ediciones la hora		{"La de arriba"}	{ESP}	7	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, "fullName", "isActive", roles) FROM stdin;
3c35cd33-52d6-4613-b9a8-226bdab1cd87	tania@google.com	$2b$10$16MIY74KZxF/3Dhr5MwCjeUjWX11V1NPBKsgBTaDMfEaFawS3nGre	Tania Carlos Parapeto	t	{user}
c5860e4a-e72e-4ef4-a9e5-14977051078f	lorenzopenzo@google.com	$2b$10$7KSw4viPE8E14q5b0WQSROCPHpY4trpOW2S6Z8dzk4VI/Uy1WxAPy	Lorenzo Arguiñano Parapeto	t	{user}
\.


--
-- Name: book PK_a3afef72ec8f80e6e5c310b28a4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: book UQ_bd183604b9c828c0bdd92cafab7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT "UQ_bd183604b9c828c0bdd92cafab7" UNIQUE (isbn);


--
-- Name: book FK_04f66cf2a34f8efc5dcd9803693; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

