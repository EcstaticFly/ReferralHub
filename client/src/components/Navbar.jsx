import { LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { authStore } from "../store/authStore";

export default function Navbar() {
  const { user, logout } = authStore();
  return (
    <header
      className="border-b fixed w-full top-0
    backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                >
                  <path
                    fill="#c7ede6"
                    d="M87.215,56.71C88.35,54.555,89,52.105,89,49.5c0-6.621-4.159-12.257-10.001-14.478 C78.999,35.015,79,35.008,79,35c0-11.598-9.402-21-21-21c-9.784,0-17.981,6.701-20.313,15.757C36.211,29.272,34.638,29,33,29 c-7.692,0-14.023,5.793-14.89,13.252C12.906,43.353,9,47.969,9,53.5C9,59.851,14.149,65,20.5,65c0.177,0,0.352-0.012,0.526-0.022 C21.022,65.153,21,65.324,21,65.5C21,76.822,30.178,86,41.5,86c6.437,0,12.175-2.972,15.934-7.614C59.612,80.611,62.64,82,66,82 c4.65,0,8.674-2.65,10.666-6.518C77.718,75.817,78.837,76,80,76c6.075,0,11-4.925,11-11C91,61.689,89.53,58.727,87.215,56.71z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M15.405,51H5.5C5.224,51,5,50.776,5,50.5S5.224,50,5.5,50h9.905c0.276,0,0.5,0.224,0.5,0.5 S15.682,51,15.405,51z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M18.5,51h-1c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1c0.276,0,0.5,0.224,0.5,0.5 S18.777,51,18.5,51z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M23.491,53H14.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h8.991c0.276,0,0.5,0.224,0.5,0.5 S23.767,53,23.491,53z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M12.5,53h-1c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1c0.276,0,0.5,0.224,0.5,0.5 S12.777,53,12.5,53z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M9.5,53h-2C7.224,53,7,52.776,7,52.5S7.224,52,7.5,52h2c0.276,0,0.5,0.224,0.5,0.5S9.777,53,9.5,53 z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M15.5,55h-2c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2c0.276,0,0.5,0.224,0.5,0.5 S15.776,55,15.5,55z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M18.5,46c-0.177,0-0.823,0-1,0c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5 c0.177,0,0.823,0,1,0c0.276,0,0.5-0.224,0.5-0.5C19,46.224,18.776,46,18.5,46z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M18.5,48c-0.177,0-4.823,0-5,0c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5 c0.177,0,4.823,0,5,0c0.276,0,0.5-0.224,0.5-0.5C19,48.224,18.776,48,18.5,48z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M23.5,50c-0.177,0-2.823,0-3,0c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5 c0.177,0,2.823,0,3,0c0.276,0,0.5-0.224,0.5-0.5C24,50.224,23.776,50,23.5,50z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M71.5,26h-10c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h10c0.276,0,0.5,0.224,0.5,0.5 S71.776,26,71.5,26z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M75.5,26h-2c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2c0.276,0,0.5,0.224,0.5,0.5 S75.776,26,75.5,26z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M80.5,28h-10c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h10c0.276,0,0.5,0.224,0.5,0.5 S80.777,28,80.5,28z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M68.5,28h-1c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1c0.276,0,0.5,0.224,0.5,0.5 S68.776,28,68.5,28z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M65.375,28H63.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1.875c0.276,0,0.5,0.224,0.5,0.5 S65.651,28,65.375,28z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M74.5,24h-5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h5c0.276,0,0.5,0.224,0.5,0.5 S74.777,24,74.5,24z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M71.5,30h-2c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2c0.276,0,0.5,0.224,0.5,0.5 S71.776,30,71.5,30z"
                  ></path>
                  <g>
                    <path
                      fill="#fdfcef"
                      d="M30.815,77.5c0,0,11.691,0,11.762,0c2.7,0,4.888-2.189,4.888-4.889 c0-2.355-1.666-4.321-3.884-4.784c0.026-0.206,0.043-0.415,0.043-0.628c0-2.796-2.267-5.063-5.063-5.063 c-1.651,0-3.113,0.794-4.037,2.017c-0.236-3.113-3.017-5.514-6.27-5.116c-2.379,0.291-4.346,2.13-4.784,4.486 c-0.14,0.756-0.126,1.489,0.014,2.177c-0.638-0.687-1.546-1.119-2.557-1.119c-1.85,0-3.361,1.441-3.48,3.261 c-0.84-0.186-1.754-0.174-2.717,0.188c-1.84,0.691-3.15,2.423-3.227,4.387c-0.109,2.789,2.12,5.085,4.885,5.085 c0.21,0,0.948,0,1.118,0h10.151"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M42.576,78H30.815c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h11.762 c2.42,0,4.389-1.969,4.389-4.389c0-2.067-1.466-3.873-3.486-4.295c-0.254-0.053-0.426-0.292-0.394-0.55 c0.022-0.186,0.039-0.375,0.039-0.567c0-2.516-2.047-4.563-4.563-4.563c-1.438,0-2.765,0.663-3.638,1.818 c-0.125,0.166-0.342,0.237-0.539,0.179c-0.2-0.059-0.342-0.235-0.358-0.442c-0.104-1.377-0.778-2.671-1.85-3.549 c-1.084-0.887-2.452-1.279-3.861-1.109c-2.165,0.265-3.955,1.943-4.353,4.081c-0.124,0.667-0.12,1.335,0.013,1.986 c0.044,0.22-0.063,0.442-0.262,0.544c-0.197,0.102-0.442,0.061-0.595-0.104c-0.574-0.619-1.353-0.959-2.19-0.959 c-1.568,0-2.878,1.227-2.98,2.793c-0.01,0.146-0.082,0.28-0.199,0.367c-0.116,0.087-0.268,0.119-0.407,0.088 c-0.844-0.186-1.64-0.131-2.434,0.167c-1.669,0.626-2.836,2.209-2.903,3.938c-0.047,1.207,0.387,2.35,1.222,3.218 C14.061,76.522,15.185,77,16.389,77h11.27c0.276,0,0.5,0.224,0.5,0.5s-0.224,0.5-0.5,0.5h-11.27c-1.479,0-2.858-0.587-3.884-1.653 s-1.559-2.469-1.501-3.951c0.084-2.126,1.511-4.069,3.552-4.836c0.8-0.3,1.628-0.4,2.468-0.298 c0.377-1.823,1.996-3.182,3.904-3.182c0.685,0,1.354,0.179,1.944,0.51c-0.001-0.386,0.035-0.773,0.107-1.159 c0.476-2.562,2.619-4.573,5.214-4.891c1.688-0.206,3.321,0.267,4.616,1.328c1.004,0.823,1.716,1.951,2.038,3.193 c1.012-0.916,2.318-1.425,3.713-1.425c3.067,0,5.563,2.496,5.563,5.563c0,0.083-0.002,0.166-0.007,0.249 c2.254,0.672,3.848,2.777,3.848,5.164C47.965,75.583,45.548,78,42.576,78z"
                    ></path>
                    <path
                      fill="#fdfcef"
                      d="M27.982,66.731c-1.808-0.119-3.365,1.13-3.476,2.789c-0.014,0.206-0.005,0.409,0.025,0.606 c-0.349-0.394-0.865-0.661-1.458-0.7c-1.085-0.071-2.022,0.645-2.158,1.62c-0.197-0.054-0.403-0.09-0.616-0.104 c-1.582-0.104-2.944,0.989-3.042,2.441"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M17.257,73.632c-0.006,0-0.011,0-0.017,0c-0.138-0.009-0.242-0.128-0.232-0.266 c0.106-1.586,1.563-2.783,3.308-2.674c0.135,0.009,0.271,0.027,0.408,0.053c0.272-0.967,1.255-1.639,2.365-1.568 c0.426,0.028,0.824,0.161,1.163,0.382c0.001-0.019,0.002-0.037,0.004-0.055c0.12-1.794,1.8-3.146,3.742-3.022 c0.138,0.009,0.242,0.128,0.232,0.266c-0.008,0.137-0.106,0.245-0.266,0.233c-1.658-0.104-3.108,1.038-3.211,2.557 c-0.012,0.186-0.004,0.372,0.023,0.551c0.017,0.11-0.041,0.217-0.141,0.265c-0.102,0.046-0.221,0.022-0.294-0.061 c-0.317-0.358-0.786-0.583-1.287-0.616c-0.959-0.064-1.774,0.555-1.893,1.405c-0.011,0.071-0.051,0.134-0.11,0.174 s-0.135,0.052-0.203,0.033c-0.189-0.051-0.38-0.084-0.567-0.096c-1.452-0.099-2.687,0.896-2.776,2.208 C17.497,73.531,17.388,73.632,17.257,73.632z"
                    ></path>
                    <g>
                      <path
                        fill="#fdfcef"
                        d="M44.556,68.4c-1.699-0.801-3.664-0.234-4.389,1.267c-0.09,0.186-0.157,0.379-0.201,0.574"
                      ></path>
                      <path
                        fill="#472b29"
                        d="M39.966,70.49c-0.019,0-0.037-0.002-0.057-0.006c-0.134-0.031-0.218-0.166-0.187-0.3 c0.05-0.216,0.123-0.427,0.219-0.625c0.783-1.622,2.9-2.243,4.721-1.384c0.125,0.059,0.179,0.208,0.12,0.333 c-0.06,0.125-0.21,0.177-0.333,0.12c-1.575-0.743-3.394-0.226-4.057,1.149c-0.08,0.165-0.142,0.34-0.184,0.521 C40.183,70.412,40.08,70.49,39.966,70.49z"
                      ></path>
                    </g>
                  </g>
                  <path
                    fill="#1fc648"
                    d="M28.989,65.011V36.989c0-3.866,3.134-7,7-7h28.023c3.866,0,7,3.134,7,7v28.023c0,3.866-3.134,7-7,7	H35.989C32.123,72.011,28.989,68.877,28.989,65.011z"
                  ></path>
                  <path
                    fill="#472b29"
                    d="M64,30.4c3.639,0,6.6,2.961,6.6,6.6v28c0,3.639-2.961,6.6-6.6,6.6H36c-3.639,0-6.6-2.961-6.6-6.6V37	c0-3.639,2.961-6.6,6.6-6.6H64 M64,29H36c-4.418,0-8,3.582-8,8v28c0,4.418,3.582,8,8,8h28c4.418,0,8-3.582,8-8V37	C72,32.582,68.418,29,64,29L64,29z"
                  ></path>
                  <path
                    fill="#472b29"
                    d="M64,69.375H36c-2.413,0-4.375-1.962-4.375-4.375V37c0-2.413,1.962-4.375,4.375-4.375h28	c2.413,0,4.375,1.962,4.375,4.375v3.625C68.375,40.832,68.207,41,68,41s-0.375-0.168-0.375-0.375V37	c0-1.999-1.626-3.625-3.625-3.625H36c-1.999,0-3.625,1.626-3.625,3.625v28c0,1.999,1.626,3.625,3.625,3.625h28	c1.999,0,3.625-1.626,3.625-3.625V48.25c0-0.207,0.168-0.375,0.375-0.375s0.375,0.168,0.375,0.375V65	C68.375,67.413,66.413,69.375,64,69.375z"
                  ></path>
                  <path
                    fill="#472b29"
                    d="M68,46c-0.207,0-0.375-0.168-0.375-0.375v-3.25C67.625,42.168,67.793,42,68,42	s0.375,0.168,0.375,0.375v3.25C68.375,45.832,68.207,46,68,46z"
                  ></path>
                  <g>
                    <path
                      fill="#fdfcef"
                      d="M80.248,76.5c1.883,0,3.517,0,3.54,0c2.11,0,3.821-1.674,3.821-3.739 c0-1.802-1.302-3.305-3.035-3.66c0.02-0.158,0.034-0.317,0.034-0.48c0-2.139-1.772-3.873-3.957-3.873 c-1.29,0-2.433,0.607-3.155,1.543c-0.185-2.381-2.358-4.218-4.9-3.913c-1.859,0.223-3.397,1.629-3.739,3.431 c-0.11,0.578-0.098,1.139,0.011,1.665c-0.498-0.525-1.208-0.856-1.998-0.856c-1.446,0-2.627,1.102-2.72,2.494 c-0.657-0.142-1.371-0.133-2.123,0.143c-1.438,0.528-2.462,1.853-2.522,3.356c-0.085,2.133,1.657,3.889,3.818,3.889 c0.164,0,0.741,0,0.874,0h7.934 M73.77,76.5h0.36"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M83.787,77h-3.54c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h3.54 c1.831,0,3.321-1.453,3.321-3.239c0-1.524-1.108-2.857-2.637-3.17c-0.257-0.052-0.429-0.294-0.396-0.554 c0.018-0.137,0.03-0.275,0.03-0.416c0-1.86-1.551-3.373-3.457-3.373c-1.093,0-2.099,0.491-2.76,1.348 c-0.125,0.165-0.343,0.232-0.538,0.174c-0.198-0.059-0.34-0.234-0.355-0.44c-0.079-1.019-0.565-1.943-1.37-2.603 c-0.828-0.68-1.886-0.984-2.973-0.853c-1.646,0.197-3.006,1.442-3.307,3.028c-0.094,0.494-0.091,0.988,0.009,1.471 c0.046,0.219-0.06,0.441-0.258,0.544c-0.196,0.104-0.439,0.064-0.595-0.099c-0.428-0.451-1.008-0.7-1.635-0.7 c-1.17,0-2.146,0.891-2.221,2.027c-0.01,0.145-0.082,0.279-0.198,0.366c-0.115,0.088-0.263,0.12-0.406,0.089 c-0.639-0.139-1.241-0.097-1.847,0.124c-1.262,0.464-2.144,1.632-2.193,2.906c-0.035,0.875,0.282,1.708,0.895,2.345 C61.533,75.636,62.393,76,63.321,76h8.808c0.276,0,0.5,0.224,0.5,0.5s-0.224,0.5-0.5,0.5h-8.808 c-1.185,0-2.331-0.485-3.144-1.332c-0.803-0.835-1.219-1.928-1.174-3.078c0.066-1.674,1.212-3.203,2.849-3.805 c0.612-0.225,1.245-0.307,1.881-0.245c0.345-1.396,1.629-2.424,3.136-2.424c0.493,0,0.977,0.113,1.413,0.323 c0.01-0.242,0.037-0.484,0.083-0.726c0.381-2.009,2.096-3.585,4.17-3.834c1.364-0.16,2.686,0.218,3.727,1.073 c0.747,0.613,1.278,1.409,1.546,2.301c0.791-0.648,1.785-1.006,2.843-1.006c2.458,0,4.457,1.961,4.457,4.373 c0,0.034-0.001,0.068-0.002,0.103c1.765,0.555,3.004,2.188,3.004,4.038C88.109,75.098,86.17,77,83.787,77z M74.129,77H73.77 c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h0.359c0.276,0,0.5,0.224,0.5,0.5S74.406,77,74.129,77z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M82.08,71.197c-0.018,0-0.036-0.002-0.055-0.006c-0.135-0.03-0.22-0.164-0.189-0.299 c0.038-0.167,0.095-0.329,0.17-0.479c0.604-1.223,2.273-1.673,3.721-1.006c0.126,0.058,0.181,0.207,0.122,0.332 c-0.057,0.125-0.209,0.179-0.331,0.122c-1.204-0.556-2.579-0.21-3.063,0.774c-0.058,0.115-0.102,0.238-0.13,0.367 C82.298,71.118,82.195,71.197,82.08,71.197z"
                    ></path>
                    <g>
                      <path
                        fill="#472b29"
                        d="M76.921,77h-1.107c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h1.107c0.276,0,0.5,0.224,0.5,0.5 S77.198,77,76.921,77z"
                      ></path>
                    </g>
                  </g>
                  <g>
                    <path
                      fill="#472b29"
                      d="M58.013,72.281c-0.027,0-0.056-0.007-0.08-0.023c-0.07-0.044-0.091-0.137-0.047-0.207l1.962-3.106 c0.044-0.07,0.138-0.091,0.207-0.047c0.07,0.044,0.091,0.137,0.047,0.207l-1.962,3.106C58.112,72.257,58.063,72.281,58.013,72.281z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M57.013,72.281c-0.027,0-0.056-0.007-0.08-0.023c-0.07-0.044-0.091-0.137-0.047-0.207l1.962-3.106 c0.044-0.07,0.139-0.091,0.207-0.047c0.07,0.044,0.091,0.137,0.047,0.207l-1.962,3.106C57.112,72.257,57.063,72.281,57.013,72.281z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M56.013,72.281c-0.027,0-0.056-0.007-0.08-0.023c-0.07-0.044-0.091-0.137-0.047-0.207l1.962-3.106 c0.044-0.07,0.139-0.091,0.207-0.047c0.07,0.044,0.091,0.137,0.047,0.207l-1.962,3.106C56.112,72.257,56.063,72.281,56.013,72.281z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M55.013,72.281c-0.027,0-0.056-0.007-0.08-0.023c-0.07-0.044-0.091-0.137-0.047-0.207l1.962-3.106 c0.044-0.07,0.139-0.091,0.207-0.047c0.07,0.044,0.091,0.137,0.047,0.207l-1.962,3.106C55.112,72.257,55.063,72.281,55.013,72.281z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M54.013,72.281c-0.027,0-0.056-0.007-0.08-0.023c-0.07-0.044-0.091-0.137-0.047-0.207l1.962-3.106 c0.044-0.07,0.139-0.091,0.207-0.047c0.07,0.044,0.091,0.137,0.047,0.207l-1.962,3.106C54.112,72.257,54.063,72.281,54.013,72.281z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M53.013,72.281c-0.027,0-0.056-0.007-0.08-0.023c-0.07-0.044-0.091-0.137-0.047-0.207l1.962-3.106 c0.044-0.07,0.138-0.091,0.207-0.047c0.07,0.044,0.091,0.137,0.047,0.207l-1.962,3.106C53.112,72.257,53.063,72.281,53.013,72.281z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M52.013,72.281c-0.027,0-0.056-0.007-0.08-0.023c-0.07-0.044-0.091-0.137-0.047-0.207l1.297-2.053 c0.044-0.07,0.138-0.091,0.207-0.047c0.07,0.044,0.091,0.137,0.047,0.207l-1.297,2.053C52.112,72.257,52.063,72.281,52.013,72.281z"
                    ></path>
                    <path
                      fill="#472b29"
                      d="M51.013,72.281c-0.027,0-0.056-0.007-0.08-0.023c-0.07-0.044-0.091-0.137-0.047-0.207l0.813-1.289 c0.043-0.071,0.139-0.09,0.207-0.047c0.07,0.044,0.091,0.137,0.047,0.207l-0.813,1.289C51.112,72.257,51.063,72.281,51.013,72.281z"
                    ></path>
                  </g>
                  <path
                    fill="#fff"
                    d="M50,39c-7.168,0-12.979,4.925-12.979,11c0,3.913,2.418,7.339,6.049,9.289	c0.196,2.478-2.09,3.69-2.09,3.69c3.123,0,4.925-1.219,5.915-2.309C47.891,60.878,48.927,61,50,61c7.168,0,12.979-4.925,12.979-11	S57.168,39,50,39z"
                  ></path>
                  <path
                    fill="#472b29"
                    d="M40.979,63.229c-0.114,0-0.215-0.078-0.242-0.189c-0.028-0.111,0.023-0.227,0.125-0.281	c0.085-0.046,2.058-1.126,1.966-3.315c-3.795-2.087-6.057-5.607-6.057-9.443c0-6.203,5.935-11.25,13.229-11.25	c1.779,0,3.506,0.295,5.132,0.877c0.13,0.046,0.198,0.189,0.151,0.32c-0.046,0.13-0.192,0.196-0.319,0.151	C53.391,39.535,51.721,39.25,50,39.25c-7.019,0-12.729,4.822-12.729,10.75c0,3.689,2.212,7.08,5.916,9.069	c0.075,0.04,0.124,0.116,0.131,0.201c0.135,1.702-0.808,2.833-1.508,3.428c2.554-0.195,4.063-1.276,4.898-2.196	c0.061-0.065,0.149-0.094,0.236-0.077C47.98,60.641,49.007,60.75,50,60.75c7.02,0,12.729-4.822,12.729-10.75	c0-1.644-0.428-3.221-1.271-4.688c-0.068-0.12-0.027-0.272,0.092-0.341c0.12-0.068,0.272-0.028,0.342,0.092	c0.888,1.543,1.338,3.205,1.338,4.938c0,6.203-5.935,11.25-13.229,11.25c-0.981,0-1.996-0.104-3.018-0.308	C45.968,62.01,44.122,63.229,40.979,63.229z"
                  ></path>
                  <path
                    fill="#472b29"
                    d="M60.04,43.278c-0.065,0-0.131-0.025-0.18-0.076c-0.838-0.867-1.826-1.615-2.938-2.225	c-0.121-0.066-0.165-0.218-0.099-0.339c0.065-0.121,0.22-0.165,0.339-0.099c1.155,0.634,2.184,1.413,3.057,2.315	c0.096,0.099,0.094,0.257-0.006,0.354C60.165,43.255,60.102,43.278,60.04,43.278z"
                  ></path>
                </svg>
              </div>
              <h1 className="text-lg font-bold">ReferralHub</h1>
            </Link>
          </div>

          <div className="flex items-center gap-8">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 hover:ring-1 hover:ring-gray-700 p-2 rounded-full">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button className="flex gap-2 items-center hover:ring-1 hover:ring-gray-700 p-2 rounded-full" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 hover:ring-1 hover:ring-gray-700 p-2 rounded-full">
                <User className="size-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
