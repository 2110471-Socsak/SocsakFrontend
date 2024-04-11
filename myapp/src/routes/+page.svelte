<script>
  const defaultChecked = true;
  const online = [
    {"title": "Test",},
    {"title": "Test",},
    {"title": "Test",},
    {"title": "Test",},
  ];
  const count = online.length;
</script>

<div class="bg-slate-900 w-screen h-screen p-10 flex">
  <div class="w-3/12 h-full ml-0 p-4 flex flex-col justify-between">
    <div>
      <div class="text-white text-2xl font-semibold px-4">Socsak</div>
      <div class="join join-vertical w-full">
        <div class="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" checked=defaultChecked /> 
          <div class="collapse-title text-sm font-medium flex gap-[6px]">
            <div>Online</div>
            <div>{count}</div>
          </div>
          <div class="collapse-content"> 
            {#each online as item}
            <div class="flex gap-4">
              <div class="text-white p-1">{item.title}</div>
            </div>
            {/each}
          </div>
        </div>
        <div class="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" /> 
          <div class="collapse-title text-sm font-medium flex gap-[6px]">
            <div>Group</div>
            <div>{count}</div>
          </div>
          <div class="collapse-content"> 
            {#each online as item}
            <div class="flex gap-4">
              <div class="text-white p-1">{item.title}</div>
            </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="text-slate-400 p-4">
      Username:
    </div>
  </div>
  <div class="w-full h-full p-4">
    <div>
      CP888 (10)
    </div>
  </div>
</div>