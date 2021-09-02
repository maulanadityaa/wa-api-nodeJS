--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Ubuntu 13.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.3

-- Started on 2021-09-02 21:15:41

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 2756223)
-- Name: wa_replies; Type: TABLE; Schema: public; Owner: drdbaarbvsvytx
--

CREATE TABLE public.wa_replies (
    id integer NOT NULL,
    keyword character varying(100),
    reply character varying(100)
);


ALTER TABLE public.wa_replies OWNER TO drdbaarbvsvytx;

--
-- TOC entry 202 (class 1259 OID 2756221)
-- Name: wa_replies_id_seq; Type: SEQUENCE; Schema: public; Owner: drdbaarbvsvytx
--

CREATE SEQUENCE public.wa_replies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wa_replies_id_seq OWNER TO drdbaarbvsvytx;

--
-- TOC entry 3983 (class 0 OID 0)
-- Dependencies: 202
-- Name: wa_replies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: drdbaarbvsvytx
--

ALTER SEQUENCE public.wa_replies_id_seq OWNED BY public.wa_replies.id;


--
-- TOC entry 3842 (class 2604 OID 2756226)
-- Name: wa_replies id; Type: DEFAULT; Schema: public; Owner: drdbaarbvsvytx
--

ALTER TABLE ONLY public.wa_replies ALTER COLUMN id SET DEFAULT nextval('public.wa_replies_id_seq'::regclass);


--
-- TOC entry 3976 (class 0 OID 2756223)
-- Dependencies: 203
-- Data for Name: wa_replies; Type: TABLE DATA; Schema: public; Owner: drdbaarbvsvytx
--

INSERT INTO public.wa_replies (id, keyword, reply) VALUES (1, 'halo', 'hai');
INSERT INTO public.wa_replies (id, keyword, reply) VALUES (2, 'selamat pagi', 'pagii!');
INSERT INTO public.wa_replies (id, keyword, reply) VALUES (3, 'malam', 'malam juga');
INSERT INTO public.wa_replies (id, keyword, reply) VALUES (4, 'apa kabar?', 'baik, kamu bagaimana?');
INSERT INTO public.wa_replies (id, keyword, reply) VALUES (5, 'assalamuailkum', 'waalaikumsalam');
INSERT INTO public.wa_replies (id, keyword, reply) VALUES (6, 'p', 'matamu p');
INSERT INTO public.wa_replies (id, keyword, reply) VALUES (7, 'cok', 'cok dewe');


--
-- TOC entry 3984 (class 0 OID 0)
-- Dependencies: 202
-- Name: wa_replies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: drdbaarbvsvytx
--

SELECT pg_catalog.setval('public.wa_replies_id_seq', 1, false);


--
-- TOC entry 3844 (class 2606 OID 2756228)
-- Name: wa_replies wa_replies_pkey; Type: CONSTRAINT; Schema: public; Owner: drdbaarbvsvytx
--

ALTER TABLE ONLY public.wa_replies
    ADD CONSTRAINT wa_replies_pkey PRIMARY KEY (id);


--
-- TOC entry 3982 (class 0 OID 0)
-- Dependencies: 633
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO drdbaarbvsvytx;


-- Completed on 2021-09-02 21:16:02

--
-- PostgreSQL database dump complete
--

